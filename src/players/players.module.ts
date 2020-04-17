import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TeamsService } from '../teams/teams.service';
import { PlayerCareerService } from '../player-career/player-career.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [PlayersController],
    providers: [PlayersService, TeamsService, PlayerCareerService],
})
export class PlayersModule {}
