import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { CreatePlayerCareerDto } from '../dto/create.player-career.dto';
import { PlayerRepository } from '../../players/player.repository';
import { TeamRepository } from '../../teams/team.repository';

@Injectable()
export class ParsePlayerCareerPipe implements PipeTransform {
    constructor(private readonly playerRepository: PlayerRepository, private readonly teamRepository: TeamRepository) {}

    async transform(data: CreatePlayerCareerDto): Promise<CreatePlayerCareerDto> {
        if ((await this.playerRepository.count({ id: data.playerId })) === 0) {
            throw new NotFoundException(`Player with id: ${data.playerId} does not exist`);
        }

        for (const careerItem of data.career) {
            if ((await this.teamRepository.count({ id: careerItem.teamId })) === 0) {
                throw new NotFoundException(`Team with id: ${careerItem.teamId} does not exist`);
            }
        }

        return data;
    }
}
