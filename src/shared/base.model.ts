import { buildSchema, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export abstract class BaseModel {
    @prop()
    public _id: string;

    @prop()
    public createdDate?: Date;

    @prop()
    public updatedDate?: Date;

    static get schema(): Schema {
        return buildSchema(this as any, {
            id: false,
            timestamps: true,
            toJSON: {
                getters: true,
                virtuals: true,
            },
        });
    }

    static get modelName(): string {
        return this.name;
    }
}
