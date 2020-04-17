import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create.player.dto';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update.player.dto';
import { SetPlayerNamePipe } from './pipes/SetPlayerName.pipe';
import { IsPlayerUniquePipe } from './pipes/IsPlayerUnique.pipe';
import { IsPlayerExistPipe } from './pipes/IsPlayerExist.pipe';
import { CanDeletePlayerPipe } from './pipes/CanDeletePlayer.pipe';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
    constructor(private playerService: PlayersService) {}

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
    public async getById(@Param('id', IsPlayerExistPipe) id: string): Promise<PlayerDto> {
        return this.playerService.getById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Player created successfully',
        type: PlayerDto,
    })
    public async create(
        @Body(SetPlayerNamePipe, IsPlayerUniquePipe)
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
        @Param('id', IsPlayerExistPipe) id: string,
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
    public async delete(@Param('id', IsPlayerExistPipe, CanDeletePlayerPipe) id: string): Promise<PlayerDto> {
        return this.playerService.delete(id);
    }
}
