import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerCareerDto } from './dto/create.player-career.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerCareerService } from './player-career.service';
import { PlayerCareerDto } from './dto/player-career.dto';
import { SuccessResponse } from '../shared/success.response';
import { TeamDto } from '../teams/dto/team.dto';

@ApiTags('Player career history')
@Controller('player-career')
export class PlayerCareerController {
    constructor(private playerCareerService: PlayerCareerService) {}

    @Get(':playerId')
    @ApiOkResponse({
        description: 'Return career for specific player',
        type: PlayerCareerDto,
    })
    @ApiNotFoundResponse({
        description: 'Career for specific player does not exist',
    })
    public async getPlayerCareer(@Param('playerId') playerId: number): Promise<PlayerCareerDto> {
        return this.playerCareerService.getForPlayer(playerId);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Career created successfully',
        type: PlayerCareerDto,
    })
    public async createPlayerCareer(@Body() playerCareer: CreatePlayerCareerDto): Promise<PlayerCareerDto> {
        return this.playerCareerService.createPlayerCareer(playerCareer);
    }

    @Delete(':playerId')
    @ApiOkResponse({
        type: SuccessResponse,
    })
    @ApiNotFoundResponse({
        description: 'Career for specific player does not exist',
    })
    public async deletePlayerCareer(@Param('playerId') playerId: number): Promise<SuccessResponse> {
        return this.playerCareerService.deleteForPlayer(playerId);
    }
}
