import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './player.entity';
import { PlayersService } from './players.service';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerEntity])],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
