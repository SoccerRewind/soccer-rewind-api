import { BaseModel } from './base.model';
import { DocumentQuery, Query } from 'mongoose';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { InternalServerErrorException } from '@nestjs/common';
import { MongoError } from 'mongodb';

type QueryList<T extends BaseModel> = DocumentQuery<
  Array<DocumentType<T>>,
  DocumentType<T>
  >;

type QueryItem<T extends BaseModel> = DocumentQuery<
  DocumentType<T>,
  DocumentType<T>
  >;

export abstract class BaseService<T extends BaseModel> {
  protected model: ReturnModelType<AnyParamConstructor<T>>;

  protected constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this.model = model;
  }

  private static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  public _createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  public _findAll(filter = {}): QueryList<T> {
    return this.model.find(filter);
  }

  public async _findAllAsync(filter = {}): Promise<Array<DocumentType<T>>> {
    try {
      return await this._findAll(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _findOne(filter = {}): QueryItem<T> {
    return this.model.findOne(filter);
  }

  public async _findOneAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this._findOne(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _findById(id: string): QueryItem<T> {
    return this.model.findById(id);
  }

  public async _findByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this._findById(id).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public async _create(item: T): Promise<DocumentType<T>> {
    try {
      return await this.model.create(item);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _delete(filter = {}): QueryItem<T> {
    return this.model.findOneAndDelete(filter);
  }

  public async _deleteAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this._delete(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _deleteById(id: string): QueryItem<T> {
    return this.model.findByIdAndDelete(id);
  }

  public async _deleteByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this._deleteById(id).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _updateById(id: string, item: Partial<T>): QueryItem<T> {
    return this.model.findByIdAndUpdate(id, item, {
      new: true,
    });
  }

  public async _updateByIdAsync(id: string, item: Partial<T>): Promise<DocumentType<T>> {
    try {
      return await this._updateById(id, item).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _update(filter = {}, doc: any): QueryItem<T> {
    return this.model.updateMany(filter, doc);
  }

  public async _updateAsync(filter = {}, doc: any): Promise<DocumentType<T>> {
    try {
      return await this._update(filter, doc).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public _count(filter = {}): Query<number> {
    return this.model.count(filter);
  }

  public async _countAsync(filter = {}): Promise<number> {
    try {
      return await this._count(filter);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  public async _isExist(id: string): Promise<boolean> {
    return !!(await this._findByIdAsync(id));
  }
}