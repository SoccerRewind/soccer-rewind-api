import { Injectable } from '@nestjs/common';
import { CreatePlayerDto, PlayerDto, UpdatePlayerDto } from './dto/player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from './player.entity';
import { SuccessResponse } from '../shared/success.response';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>,
    ) {}

    public async getAll(): Promise<PlayerDto[]> {
        return this.playerRepository.find().then(players => players.map(e => PlayerDto.fromEntity(e)));
    }

    public async getById(id: number): Promise<PlayerDto> {
        return this.playerRepository
            .createQueryBuilder()
            .whereInIds(id)
            .getOne()
            .then(e => PlayerDto.fromEntity(e));
    }

    public async create(inputPlayer: CreatePlayerDto): Promise<PlayerDto> {
        return this.playerRepository.save(inputPlayer).then(e => PlayerDto.fromEntity(e));
    }

    public async update(id: number, updatePlayer: UpdatePlayerDto): Promise<PlayerDto> {
        await this.playerRepository
            .createQueryBuilder()
            .update()
            .set(updatePlayer)
            .whereInIds(id)
            .execute();
        return this.getById(id);
    }

    public async delete(id: number): Promise<SuccessResponse> {
        await this.playerRepository
            .createQueryBuilder()
            .softDelete()
            .whereInIds(id)
            .execute();
        return new SuccessResponse(`Player with id: ${id} deleted successfully`);
    }
}
