import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModel } from './player.model';
import { TeamsService } from '../teams/teams.service';
import { TeamModel } from '../teams/team.model';

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
        ]),
    ],
    controllers: [PlayersController],
    providers: [PlayersService, TeamsService],
})
export class PlayersModule {}
