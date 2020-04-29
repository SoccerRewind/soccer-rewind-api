import { Injectable } from '@nestjs/common';
import { CreatePlayerCareerDto } from './dto/create.player-career.dto';
import { PlayerCareerRepository } from './player-career.repository';
import { PlayerCareerEntity } from './player-career.entity';
import { PlayerCareerDto } from './dto/player-career.dto';
import { SuccessResponse } from '../shared/success.response';

@Injectable()
export class PlayerCareerService {
    constructor(private playerCareerRepository: PlayerCareerRepository) {}

    public async createPlayerCareer(playerCareer: CreatePlayerCareerDto): Promise<PlayerCareerDto> {
        await this.playerCareerRepository.save(playerCareer.toEntities());
        const entities: PlayerCareerEntity[] = await this.playerCareerRepository.findForPlayer(playerCareer.playerId);
        return PlayerCareerDto.fromEntities(entities);
    }

    public async getForPlayer(playerId: number): Promise<PlayerCareerDto> {
        const entities: PlayerCareerEntity[] = await this.playerCareerRepository.findForPlayer(playerId);
        return PlayerCareerDto.fromEntities(entities);
    }

    public async deleteForPlayer(playerId: number): Promise<SuccessResponse> {
        await this.playerCareerRepository.delete({ playerId });
        return new SuccessResponse(`Player career for player with id: ${playerId} deleted successfully`);
    }
}
