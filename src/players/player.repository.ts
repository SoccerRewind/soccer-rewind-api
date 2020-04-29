import { PlayerEntity } from './player.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends Repository<PlayerEntity> {}
