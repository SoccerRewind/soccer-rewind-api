import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dto/team.dto';
import { SuccessResponse } from '../shared/success.response';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(TeamEntity)
        private teamRepository: Repository<TeamEntity>,
    ) {}

    public async getAll(): Promise<TeamDto[]> {
        return this.teamRepository.find().then(teams => teams.map(e => TeamDto.fromEntity(e)));
    }

    public async create(inputTeam: CreateTeamDto): Promise<TeamDto> {
        return this.teamRepository.save(inputTeam).then(e => TeamDto.fromEntity(e));
    }

    public async getById(id: number): Promise<TeamDto> {
        return this.teamRepository
            .createQueryBuilder()
            .whereInIds(id)
            .getOne()
            .then(e => TeamDto.fromEntity(e));
    }

    public async update(id: number, updateTeam: UpdateTeamDto): Promise<any> {
        await this.teamRepository
            .createQueryBuilder()
            .update()
            .set(updateTeam)
            .whereInIds(id)
            .execute();
        return this.getById(id);
    }

    public async delete(id: number): Promise<SuccessResponse> {
        await this.teamRepository
            .createQueryBuilder()
            .softDelete()
            .whereInIds(id)
            .execute();
        return new SuccessResponse(`Team with id: ${id} deleted successfully`);
    }
}
