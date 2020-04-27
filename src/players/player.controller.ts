import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreatePlayerDto, PlayerDto, UpdatePlayerDto } from './dto/player.dto';
import { IsPlayerExistPipe } from './pipes/IsPlayerExist.pipe';
import { SuccessResponse } from '../shared/success.response';
import { SetPlayerNamePipe } from './pipes/SetPlayerName.pipe';

@ApiTags('Players')
@Controller('players')
export class PlayerController {
    constructor(private playerService: PlayerService) {}

    @Get()
    @ApiOkResponse({
        description: 'Return all players from database',
        type: [PlayerDto],
    })
    public async getAll(): Promise<PlayerDto[]> {
        return this.playerService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Return specific player',
        type: PlayerDto,
    })
    @ApiNotFoundResponse({
        description: 'Player does not exist',
    })
    public async getById(@Param('id', IsPlayerExistPipe) id: number): Promise<PlayerDto> {
        return this.playerService.getById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Player created successfully',
        type: PlayerDto,
    })
    public async create(
        @Body(SetPlayerNamePipe)
        player: CreatePlayerDto,
    ): Promise<PlayerDto> {
        return this.playerService.create(player);
    }

    @Patch(':id')
    @ApiOkResponse({
        description: 'Return updated player',
        type: PlayerDto,
    })
    @ApiNotFoundResponse({
        description: 'Player does not exist',
    })
    public async update(
        @Param('id', IsPlayerExistPipe) id: number,
        @Body() player: UpdatePlayerDto,
    ): Promise<PlayerDto> {
        return this.playerService.update(id, player);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Return deleted player',
        type: PlayerDto,
    })
    @ApiNotFoundResponse({
        description: 'Player does not exist',
    })
    public async delete(@Param('id', IsPlayerExistPipe) id: number): Promise<SuccessResponse> {
        return this.playerService.delete(id);
    }
}
