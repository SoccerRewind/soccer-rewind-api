import { Injectable } from '@nestjs/common';
import { CreatePlayerDto, PlayerDto, UpdatePlayerDto } from './dto/player.dto';
import { SuccessResponse } from '../shared/success.response';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
    constructor(private playerRepository: PlayerRepository) {}

    public async getAll(): Promise<PlayerDto[]> {
        return this.playerRepository._findAll().then(players => players.map(e => PlayerDto.fromEntity(e)));
    }

    public async getById(id: number): Promise<PlayerDto> {
        return this.playerRepository._findById(id).then(e => PlayerDto.fromEntity(e));
    }

    public async create(inputPlayer: CreatePlayerDto): Promise<PlayerDto> {
        return this.playerRepository._create(inputPlayer).then(e => PlayerDto.fromEntity(e));
    }

    public async update(id: number, updatePlayer: UpdatePlayerDto): Promise<PlayerDto> {
        return this.playerRepository._update(id, updatePlayer).then(e => PlayerDto.fromEntity(e));
    }

    public async delete(id: number): Promise<SuccessResponse> {
        await this.playerRepository._delete(id);
        return new SuccessResponse(`Player with id: ${id} deleted successfully`);
    }
}
