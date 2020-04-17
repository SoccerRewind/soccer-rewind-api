import { prop } from '@typegoose/typegoose';
import { BaseModel } from '../shared/base.model';

export class TeamModel extends BaseModel {
    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public shortName: string;

    @prop({ required: true })
    public logoImg: string;

    @prop({ required: true })
    public country: string;
}
