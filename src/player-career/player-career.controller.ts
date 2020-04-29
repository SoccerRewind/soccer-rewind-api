import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerCareerDto } from './dto/create.player-career.dto';
import { ApiTags } from '@nestjs/swagger';
import { PlayerCareerService } from './player-career.service';
import { PlayerCareerDto } from './dto/player-career.dto';
import { SuccessResponse } from '../shared/success.response';

@ApiTags('Player career history')
@Controller('player-career')
export class PlayerCareerController {
    constructor(private playerCareerService: PlayerCareerService) {}

    @Get(':playerId')
    public async getPlayerCareer(@Param('playerId') playerId: number): Promise<PlayerCareerDto> {
        return this.playerCareerService.getForPlayer(playerId);
    }

    @Post()
    public async createPlayerCareer(@Body() playerCareer: CreatePlayerCareerDto): Promise<PlayerCareerDto> {
        return this.playerCareerService.createPlayerCareer(playerCareer);
    }

    @Delete(':playerId')
    public async deletePlayerCareer(@Param('playerId') playerId: number): Promise<SuccessResponse> {
        return this.playerCareerService.deleteForPlayer(playerId);
    }
}
