import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { PlayerModel } from './player.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { TeamsService } from '../teams/teams.service';
import { TeamModel } from '../teams/team.model';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService extends BaseService<PlayerModel> {
  constructor(
    @InjectModel(PlayerModel.modelName) private readonly playerModel: ReturnModelType<typeof PlayerModel>,
    @Inject(forwardRef(() => TeamsService)) private readonly teamService: TeamsService
  ) {
    super(playerModel);
  }

  public async getAll(): Promise<PlayerDto[]> {
    const players = await this._findAll().populate('teams');

    return players.map(player => {
      return PlayersService.mapPlayerModelToDTO(player)
    });
  }

  public async create(inputPlayer: CreatePlayerDto): Promise<PlayerDto> {
    if (!inputPlayer.name) {
      inputPlayer.name = `${inputPlayer.firstName} ${inputPlayer.lastName}`;
    }

    const newPlayer = this._createModel(inputPlayer);
    for (const teamId of inputPlayer.teamIds) {

      const team = await this.teamService._findByIdAsync(teamId);
      if (team) {
        newPlayer.teams.push(team);
      }
    }

    newPlayer._id = PlayersService.generateUniqueID(inputPlayer);

    try {
      await this._create(newPlayer);
      return PlayersService.mapPlayerModelToDTO(newPlayer);
    } catch (e) {
      throw e;
    }
  }

  public async update(id: string, updatePlayer: UpdatePlayerDto): Promise<PlayerDto> {
    if (!(await this._isExist(id))) {
      throw new NotFoundException(`Player with id: ${id} does not exist`);
    }
    await this._updateById(id, updatePlayer);
    const player: PlayerModel = await this._findById(id).populate('teams');
    return PlayersService.mapPlayerModelToDTO(player);
  }

  private static mapPlayerModelToDTO(player: PlayerModel): PlayerDto {
    return {
      id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      name: player.name,
      country: player.country,
      face: player.face,
      teams: (player.teams as TeamModel[]).map(team => {
        return {
          id: team._id,
          name: team.name
        }
      })
    }
  }

  private static generateUniqueID(player: CreatePlayerDto) {
    return player.name.toLowerCase().replace(/ /g, '_');
  }
}
