import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModel } from './team.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamModel.modelName, schema: TeamModel.schema, collection: 'teams' }
    ])
  ],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
