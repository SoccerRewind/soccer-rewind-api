import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TeamModel } from './team.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { InputTeamDto } from './dto/input-team.dto';
import { TeamDto } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(TeamModel) private readonly teamModel: ReturnModelType<typeof TeamModel>
  ) {
  }

  public async getAll(): Promise<TeamDto[]> {
    const teams: TeamModel[] = await this.teamModel.find();
    console.log(teams);
    return teams.map(team => TeamsService.mapTeamModelToDTO(team));
  }

  public async create(inputTeam: InputTeamDto): Promise<TeamDto> {
    const uniqueId = TeamsService.generateUniqueID(inputTeam);
    if (await this.isExist(uniqueId)) {
      throw new BadRequestException(`Team with id: ${uniqueId} is already exist`)
    }

    const created = new this.teamModel(inputTeam);
    created._id = uniqueId;
    console.log(created);
    try {
      await created.save();
      return TeamsService.mapTeamModelToDTO(created);
    } catch (e) {
      throw e;
    }
  }

  public async getById(id: string): Promise<TeamDto> {
    const team: TeamModel = await this.teamModel.findById(id);
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

    await this.teamModel.findByIdAndUpdate(id, updateTeam);
    const team: TeamModel = await this.teamModel.findById(id);
    return TeamsService.mapTeamModelToDTO(team);
  }

  public async delete(id: string): Promise<TeamDto> {
    if (!(await this.isExist(id))) {
      throw new NotFoundException(`Team with id: ${id} does not exist`);
    }

    const team: TeamModel = await this.teamModel.findById(id);
    await this.teamModel.findByIdAndDelete(id);
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
    const team: TeamModel = await this.teamModel.findById(id);
    return !!team;
  }

  private static generateUniqueID(team: InputTeamDto) {
    return team.name.toLowerCase().replace(/ /g, '_');
  }
}
