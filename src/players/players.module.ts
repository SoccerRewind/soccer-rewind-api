import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModel } from './player.model';
import { TeamsService } from '../teams/teams.service';
import { TeamModel } from '../teams/team.model';
import { PlayerCareerModel } from '../player-career/player-career.model';
import { PlayerCareerService } from '../player-career/player-career.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: PlayerModel.modelName,
                schema: PlayerModel.schema,
                collection: 'players',
            },
            {
                name: TeamModel.modelName,
                schema: TeamModel.schema,
                collection: 'teams',
            },
            {
                name: PlayerCareerModel.modelName,
                schema: PlayerCareerModel.schema,
                collection: 'player-career',
            },
        ]),
    ],
    controllers: [PlayersController],
    providers: [PlayersService, TeamsService, PlayerCareerService],
})
export class PlayersModule {}
