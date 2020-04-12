import { Body, Controller, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerCareerValidationPipe } from './validators/PlayerCareerValidation.pipe';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private playerService: PlayersService) { }

  @Get()
  public async getAll(): Promise<PlayerDto[]> {
    return this.playerService.getAll();
  }

  @Post()
  @UsePipes(PlayerCareerValidationPipe)
  public async create(@Body() player: CreatePlayerDto): Promise<PlayerDto> {
    return this.playerService.create(player);
  }

  @Patch(':id')
  @UsePipes(PlayerCareerValidationPipe)
  public async update(@Param('id') id: string, @Body() player: UpdatePlayerDto): Promise<PlayerDto> {
    return this.playerService.update(id, player);
  }
}
