import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModel } from './team.model';
import { PlayersService } from '../players/players.service';
import { PlayerModel } from '../players/player.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamModel.modelName, schema: TeamModel.schema, collection: 'teams' },
      { name: PlayerModel.modelName, schema: PlayerModel.schema, collection: 'players'},
    ])
  ],
  controllers: [TeamsController],
  providers: [TeamsService, PlayersService]
})
export class TeamsModule {}
