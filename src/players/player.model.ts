import { BaseModel } from '../shared/base.model';
import { arrayProp, mongoose, prop, Ref } from '@typegoose/typegoose';
import { TeamModel } from '../teams/team.model';

export class PlayerHistoryItemModel {
  constructor(team: TeamModel, from: string, to: string) {
    this.team = team;
    this.from = from;
    this.to = to;
  }

  @prop({ ref: TeamModel, refType: mongoose.Schema.Types.String })
  public team: Ref<TeamModel>;

  @prop({ required: true })
  public from: string;

  @prop({ required: true })
  public to: string;
}

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

  @arrayProp({ _id: false, items: PlayerHistoryItemModel })
  public history: PlayerHistoryItemModel[]
}