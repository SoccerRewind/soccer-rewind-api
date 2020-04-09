import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class TeamModel extends TimeStamps {
  @prop({ required: true })
  public _id: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public logo: string;

  @prop({ required: true })
  public country: string;
}