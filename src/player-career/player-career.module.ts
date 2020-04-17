import { Module } from '@nestjs/common';
import { PlayerCareerService } from './player-career.service';
import { PlayerCareerController } from './player-career.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerCareerModel } from './player-career.model';
import { TeamModel } from '../teams/team.model';
import { PlayerModel } from '../players/player.model';
import { PlayersService } from '../players/players.service';
import { TeamsService } from '../teams/teams.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: PlayerCareerModel.modelName,
                schema: PlayerCareerModel.schema,
                collection: 'player-career',
            },
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
        ]),
    ],
    providers: [PlayerCareerService, PlayersService, TeamsService],
    controllers: [PlayerCareerController],
})
export class PlayerCareerModule {}
