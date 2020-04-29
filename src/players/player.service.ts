import { Injectable } from '@nestjs/common';
import { CreatePlayerDto, PlayerDto, UpdatePlayerDto } from './dto/player.dto';
import { SuccessResponse } from '../shared/success.response';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
    constructor(private playerRepository: PlayerRepository) {}

    public async getAll(): Promise<PlayerDto[]> {
        return this.playerRepository.find().then(players => players.map(e => PlayerDto.fromEntity(e)));
    }

    public async getById(id: number): Promise<PlayerDto> {
        return this.playerRepository.findOne(id).then(e => PlayerDto.fromEntity(e));
    }

    public async create(inputPlayer: CreatePlayerDto): Promise<PlayerDto> {
        return this.playerRepository.save(inputPlayer).then(e => PlayerDto.fromEntity(e));
    }

    public async update(id: number, updatePlayer: UpdatePlayerDto): Promise<PlayerDto> {
        await this.playerRepository.update(id, updatePlayer);
        return this.playerRepository.findOne(id).then(e => PlayerDto.fromEntity(e));
    }

    public async delete(id: number): Promise<SuccessResponse> {
        await this.playerRepository.delete(id);
        return new SuccessResponse(`Player with id: ${id} deleted successfully`);
    }
}
