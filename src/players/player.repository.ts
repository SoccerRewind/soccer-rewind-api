import { BaseRepository } from '../shared/base.repository';
import { PlayerEntity } from './player.entity';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.dto';
import { EntityRepository } from 'typeorm';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends BaseRepository<PlayerEntity, CreatePlayerDto, UpdatePlayerDto> {}
