import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PlayerRepository } from '../player.repository';

@Injectable()
export class IsPlayerExistPipe implements PipeTransform {
    constructor(private playerRepository: PlayerRepository) {}

    async transform(id: number): Promise<number> {
        if ((await this.playerRepository.count({ id: id })) === 0) {
            throw new NotFoundException(`Player with id: ${id} does not exist`);
        }

        return id;
    }
}
