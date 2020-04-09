import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TeamModel } from './team.model';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';
import { BaseService } from '../shared/base.service';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService extends BaseService<TeamModel> {
  constructor(
    @InjectModel(TeamModel.modelName) private readonly teamModel: ReturnModelType<typeof TeamModel>
  ) {
    super(teamModel);
  }

  public async getAll(): Promise<any[]> {
    const teams: TeamModel[] = await this._findAllAsync();
    return teams.map(team => TeamsService.mapTeamModelToDTO(team));
  }

  public async create(inputTeam: CreateTeamDto): Promise<TeamDto> {
    const uniqueId = TeamsService.generateUniqueID(inputTeam);
    if (await this.isExist(uniqueId)) {
      throw new BadRequestException(`Team with id: ${uniqueId} is already exist`)
    }

    const newTeam = this._createModel(inputTeam);
    newTeam._id = uniqueId;

    try {
      await this._create(newTeam);
      return TeamsService.mapTeamModelToDTO(newTeam);
    } catch (e) {
      throw e;
    }
  }

  public async getById(id: string): Promise<TeamDto> {
    const team: TeamModel = await this._findByIdAsync(id);
    if (team) {
      return TeamsService.mapTeamModelToDTO(team);
    } else {
      throw new NotFoundException(`Team with id: ${id} does not exist`);
    }
  }

  public async update(id: string, updateTeam: UpdateTeamDto): Promise<TeamDto> {
    if (!(await this.isExist(id))) {
      throw new NotFoundException(`Team with id: ${id} does not exist`);
    }

    await this._updateAsync(id, updateTeam);
    const team: TeamModel = await this._findByIdAsync(id);
    return TeamsService.mapTeamModelToDTO(team);
  }

  public async delete(id: string): Promise<TeamDto> {
    if (!(await this.isExist(id))) {
      throw new NotFoundException(`Team with id: ${id} does not exist`);
    }

    const team: TeamModel = await this._findByIdAsync(id);
    await this._deleteByIdAsync(id);
    return TeamsService.mapTeamModelToDTO(team);
  }

  private static mapTeamModelToDTO(team: TeamModel): TeamDto {
    return {
      id: team._id,
      name: team.name,
      country: team.country,
      logo: team.logo,
    };
  }

  private async isExist(id: string): Promise<boolean> {
    const team: TeamModel = await this._findByIdAsync(id);
    return !!team;
  }

  private static generateUniqueID(team: CreateTeamDto) {
    return team.name.toLowerCase().replace(/ /g, '_');
  }
}
