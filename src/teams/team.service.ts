import { Injectable } from '@nestjs/common';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dto/team.dto';
import { SuccessResponse } from '../shared/success.response';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
    constructor(private teamRepository: TeamRepository) {}

    public async getAll(): Promise<TeamDto[]> {
        return this.teamRepository.find().then(teams => teams.map(e => TeamDto.fromEntity(e)));
    }

    public async create(inputTeam: CreateTeamDto): Promise<TeamDto> {
        return this.teamRepository.save(inputTeam).then(e => TeamDto.fromEntity(e));
    }

    public async getById(id: number): Promise<TeamDto> {
        return this.teamRepository.findOne(id).then(e => TeamDto.fromEntity(e));
    }

    public async update(id: number, updateTeam: UpdateTeamDto): Promise<TeamDto> {
        await this.teamRepository.update(id, updateTeam);
        return this.teamRepository.findOne(id).then(e => TeamDto.fromEntity(e));
    }

    public async delete(id: number): Promise<SuccessResponse> {
        await this.teamRepository.delete(id);
        return new SuccessResponse(`Team with id: ${id} deleted successfully`);
    }
}
