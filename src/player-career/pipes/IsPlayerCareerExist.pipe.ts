import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PlayerCareerRepository } from '../player-career.repository';

@Injectable()
export class IsPlayerCareerExistPipe implements PipeTransform {
    constructor(private playerCareerRepository: PlayerCareerRepository) {}

    async transform(id: number): Promise<number> {
        if (!(await this.playerCareerRepository.isExist(id))) {
            throw new NotFoundException(`Player career for player with id: ${id} does not exist`);
        }

        return id;
    }
}
