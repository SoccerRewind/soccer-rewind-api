import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from '../player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsPlayerExistPipe implements PipeTransform {
    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>,
    ) {}

    async transform(id: number): Promise<number> {
        if ((await this.playerRepository.count({ id: id })) === 0) {
            throw new NotFoundException(`Player with id: ${id} does not exist`);
        }

        return id;
    }
}
