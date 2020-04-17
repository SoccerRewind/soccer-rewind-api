import { BaseModel } from '../shared/base.model';
import { arrayProp, prop, Ref } from '@typegoose/typegoose';
import { TeamModel } from '../teams/team.model';
import { Schema } from 'mongoose';
import { PlayerModel } from '../players/player.model';

export class PlayerCareerItem {
    constructor(team: TeamModel, from: string, to: string) {
        this.teamId = team;
        this.from = from;
        this.to = to;
    }

    @prop({ ref: TeamModel, refType: Schema.Types.String, required: true })
    public teamId: Ref<TeamModel>;

    @prop({ required: true })
    public from: string;

    @prop({ required: true })
    public to: string;
}

export class PlayerCareerModel extends BaseModel {
    @prop({ ref: PlayerModel, refType: Schema.Types.String })
    public playerId: Ref<PlayerModel>;

    @arrayProp({ _id: false, items: PlayerCareerItem, required: true })
    public teams: PlayerCareerItem[];
}
