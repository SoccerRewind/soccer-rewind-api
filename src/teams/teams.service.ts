import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeamModel } from './team.model';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateTeamDto } from './dto/create.team.dto';
import { TeamDto } from './dto/team.dto';
import { BaseService } from '../shared/base.service';
import { UpdateTeamDto } from './dto/update.team.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class TeamsService extends BaseService<TeamModel> {
    constructor(
        @InjectModel(TeamModel.modelName)
        private readonly teamModel: ReturnModelType<typeof TeamModel>,
        @Inject(forwardRef(() => PlayersService))
        private readonly playerService: PlayersService,
    ) {
        super(teamModel);
    }

    public async getAll(): Promise<any[]> {
        const teams: TeamModel[] = await this._findAllAsync();
        return teams.map(team => TeamsService.mapTeamModelToDTO(team));
    }

    public async create(inputTeam: CreateTeamDto): Promise<TeamDto> {
        const newTeam = this._createModel(inputTeam);
        newTeam._id = TeamsService.generateUniqueID(inputTeam);

        try {
            await this._create(newTeam);
            return TeamsService.mapTeamModelToDTO(newTeam);
        } catch (e) {
            throw e;
        }
    }

    public async getById(id: string): Promise<TeamDto> {
        const team: TeamModel = await this._findByIdAsync(id);
        return TeamsService.mapTeamModelToDTO(team);
    }

    public async update(id: string, updateTeam: UpdateTeamDto): Promise<TeamDto> {
        await this._updateByIdAsync(id, updateTeam);
        const team: TeamModel = await this._findByIdAsync(id);
        return TeamsService.mapTeamModelToDTO(team);
    }

    public async delete(id: string): Promise<TeamDto> {
        const team: TeamModel = await this._findByIdAsync(id);
        await this._deleteByIdAsync(id);
        return TeamsService.mapTeamModelToDTO(team);
    }

    public static mapTeamModelToDTO(team: TeamModel): TeamDto {
        return {
            id: team._id,
            name: team.name,
            shortName: team.shortName,
            logoImg: team.logoImg,
            country: team.country,
        };
    }

    public static generateUniqueID(team: CreateTeamDto) {
        return team.name.toLowerCase().replace(/ /g, '_');
    }
}
