import { BaseModel } from '../shared/base.model';
import { prop } from '@typegoose/typegoose';

export class PlayerModel extends BaseModel {
    @prop({ required: true })
    public firstName: string;

    @prop({ required: true })
    public lastName: string;

    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public faceImg: string;

    @prop({ required: true })
    public country: string;
}
