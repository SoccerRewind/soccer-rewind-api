import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerCareerEntity } from './player-career.entity';
import { PlayerCareerRepository } from './player-career.repository';
import { PlayerCareerService } from './player-career.service';
import { PlayerCareerController } from './player-career.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerCareerEntity, PlayerCareerRepository])],
    providers: [PlayerCareerService],
    controllers: [PlayerCareerController],
})
export class PlayerCareerModule {}
