import { BaseModel } from '../shared/base.model';
import { arrayProp, mongoose, prop, Ref } from '@typegoose/typegoose';
import { TeamModel } from '../teams/team.model';

export class PlayerModel extends BaseModel {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public face: string;

  @prop({ required: true })
  public country: string;

  @arrayProp({ ref: TeamModel, refType: mongoose.Schema.Types.String })
  public teams: Ref<TeamModel>[]
}