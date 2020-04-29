import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './player.entity';
import { PlayerService } from './player.service';
import { PlayerRepository } from './player.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerEntity, PlayerRepository])],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule {}
