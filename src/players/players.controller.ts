import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  constructor(private playerService: PlayersService) { }

  @Get()
  public async getAll(): Promise<PlayerDto[]> {
    return this.playerService.getAll();
  }

  @Post()
  public async create(@Body(SetPlayerNamePipe, PlayerExistValidationPipe, PlayerCareerValidationPipe) player: CreatePlayerDto): Promise<PlayerDto> {
    return this.playerService.create(player);
  }

  @Patch(':id')
  public async update(@Param('id', PlayerExistValidationPipe) id: string, @Body(PlayerCareerValidationPipe) player: UpdatePlayerDto): Promise<PlayerDto> {
    return this.playerService.update(id, player);
  }
}
