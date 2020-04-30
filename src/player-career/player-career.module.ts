import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerCareerEntity } from './player-career.entity';
import { PlayerCareerRepository } from './player-career.repository';
import { PlayerCareerService } from './player-career.service';
import { PlayerCareerController } from './player-career.controller';
import { PlayerRepository } from '../players/player.repository';
import { TeamRepository } from '../teams/team.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerCareerEntity, PlayerCareerRepository, PlayerRepository, TeamRepository])],
    providers: [PlayerCareerService],
    controllers: [PlayerCareerController],
})
export class PlayerCareerModule {}
