import { Injectable } from '@nestjs/common';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dto/team.dto';
import { SuccessResponse } from '../shared/success.response';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
    constructor(private teamRepository: TeamRepository) {}

    public async getAll(): Promise<TeamDto[]> {
        return this.teamRepository._findAll().then(teams => teams.map(e => TeamDto.fromEntity(e)));
    }

    public async create(inputTeam: CreateTeamDto): Promise<TeamDto> {
        return this.teamRepository._create(inputTeam).then(e => TeamDto.fromEntity(e));
    }

    public async getById(id: number): Promise<TeamDto> {
        return this.teamRepository._findById(id).then(e => TeamDto.fromEntity(e));
    }

    public async update(id: number, updateTeam: UpdateTeamDto): Promise<TeamDto> {
        return this.teamRepository._update(id, updateTeam).then(e => TeamDto.fromEntity(e));
    }

    public async delete(id: number): Promise<SuccessResponse> {
        await this.teamRepository._delete(id);
        return new SuccessResponse(`Team with id: ${id} deleted successfully`);
    }
}
