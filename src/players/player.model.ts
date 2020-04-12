import { BaseModel } from '../shared/base.model';
import { arrayProp, mongoose, prop, Ref } from '@typegoose/typegoose';
import { TeamModel } from '../teams/team.model';

// class PlayerTeam {
//   @prop()
//   public from: string;
//
//   @prop()
//   public to: string;
//
//   @prop({ ref: TeamModel, refType: mongoose.Schema.Types.String })
//   public team: Ref<TeamModel>
// }

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

  // @arrayProp({ _id: false, items: PlayerTeam })
  // public teams: PlayerTeam[]

  @arrayProp({ ref: TeamModel, refType: mongoose.Schema.Types.String })
  public teams: Ref<TeamModel>[]
}