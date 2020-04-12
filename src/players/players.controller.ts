import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerCareerValidationPipe } from './pipes/PlayerCareerValidation.pipe';
import { SetPlayerNamePipe } from './pipes/SetPlayerName.pipe';
import { PlayerExistValidationPipe } from './pipes/PlayerExistValidation.pipe';

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

  @Post()
  @ApiCreatedResponse({
    description: 'Player created successfully',
    type: PlayerDto,
  })
  public async create(
    @Body(
      SetPlayerNamePipe,
      PlayerExistValidationPipe,
      PlayerCareerValidationPipe,
    )
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
    @Param('id', PlayerExistValidationPipe) id: string,
    @Body(PlayerCareerValidationPipe) player: UpdatePlayerDto,
  ): Promise<PlayerDto> {
    return this.playerService.update(id, player);
  }
}
