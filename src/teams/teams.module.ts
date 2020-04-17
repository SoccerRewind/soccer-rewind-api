import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { PlayersService } from '../players/players.service';
import { PlayerCareerService } from '../player-career/player-career.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TeamsController],
    providers: [TeamsService, PlayersService, PlayerCareerService],
})
export class TeamsModule {}
