import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModel } from './team.model';
import { PlayersService } from '../players/players.service';
import { PlayerModel } from '../players/player.model';
import { PlayerCareerService } from '../player-career/player-career.service';
import { PlayerCareerModel } from '../player-career/player-career.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TeamModel.modelName,
                schema: TeamModel.schema,
                collection: 'teams',
            },
            {
                name: PlayerModel.modelName,
                schema: PlayerModel.schema,
                collection: 'players',
            },
            {
                name: PlayerCareerModel.modelName,
                schema: PlayerCareerModel.schema,
                collection: 'player-career',
            },
        ]),
    ],
    controllers: [TeamsController],
    providers: [TeamsService, PlayersService, PlayerCareerService],
})
export class TeamsModule {}
