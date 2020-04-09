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

  protected _createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  protected _findAll(filter = {}): QueryList<T> {
    return this.model.find(filter);
  }

  protected async _findAllAsync(filter = {}): Promise<Array<DocumentType<T>>> {
    try {
      return await this._findAll(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected _findOne(filter = {}): QueryItem<T> {
    return this.model.findOne(filter);
  }

  protected async _findOneAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this._findOne(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected _findById(id: string): QueryItem<T> {
    return this.model.findById(id);
  }

  protected async _findByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this._findById(id).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected async _create(item: T): Promise<DocumentType<T>> {
    try {
      return await this.model.create(item);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected _delete(filter = {}): QueryItem<T> {
    return this.model.findOneAndDelete(filter);
  }

  protected async _deleteAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this._delete(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected _deleteById(id: string): QueryItem<T> {
    return this.model.findByIdAndDelete(id);
  }

  protected async _deleteByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this._deleteById(id).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected _update(id: string, item: Partial<T>): QueryItem<T> {
    return this.model.findByIdAndUpdate(id, item, {
      new: true,
    });
  }

  protected async _updateAsync(id: string, item: Partial<T>): Promise<DocumentType<T>> {
    try {
      return await this._update(id, item).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected _count(filter = {}): Query<number> {
    return this.model.count(filter);
  }

  protected async _countAsync(filter = {}): Promise<number> {
    try {
      return await this._count(filter);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  protected async _isExist(id: string): Promise<boolean> {
    return !!(await this._findByIdAsync(id));
  }
}