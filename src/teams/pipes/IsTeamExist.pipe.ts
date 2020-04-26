import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from '../team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsTeamExistPipe implements PipeTransform {
    constructor(@InjectRepository(TeamEntity)
                private teamRepository: Repository<TeamEntity>,) {}

    async transform(id: string): Promise<any> {
        if (await this.teamRepository.count({ where: { id: id }}) === 0) {
            throw new NotFoundException(`Team with id: ${id} does not exist`);
        }
        return id;
    }
}
