import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TeamRepository } from '../team.repository';

@Injectable()
export class IsTeamExistPipe implements PipeTransform {
    constructor(private teamRepository: TeamRepository) {}

    async transform(id: number): Promise<any> {
        if ((await this.teamRepository.count({ id: id })) === 0) {
            throw new NotFoundException(`Team with id: ${id} does not exist`);
        }

        return id;
    }
}
