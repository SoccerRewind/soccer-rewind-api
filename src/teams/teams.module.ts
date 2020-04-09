import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { TeamModel } from './team.model';

@Module({
  imports: [TypegooseModule.forFeature([TeamModel])],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
