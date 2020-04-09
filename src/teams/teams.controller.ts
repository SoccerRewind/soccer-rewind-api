import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { InputTeamDto } from './dto/input-team.dto';
import { TeamDto } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) { }

  @Get()
  @ApiOkResponse({
    description: 'Return all teams from database',
    type: [TeamDto]
  })
  public async getAll(): Promise<TeamDto[]> {
    return this.teamService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return specific team',
    type: TeamDto
  })
  @ApiNotFoundResponse({
    description: 'Team does not exist'
  })
  public async getById(@Param('id') id: string): Promise<TeamDto> {
    return this.teamService.getById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Team created successfully',
    type: TeamDto
  })
  public async create(@Body() team: InputTeamDto): Promise<TeamDto> {
    return this.teamService.create(team);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Return updated team',
    type: TeamDto
  })
  @ApiNotFoundResponse({
    description: 'Team does not exist'
  })
  public async update(@Param('id') id: string, @Body() team: UpdateTeamDto): Promise<TeamDto> {
    return this.teamService.update(id, team)
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Return deleted team',
    type: TeamDto
  })
  @ApiNotFoundResponse({
    description: 'Team does not exist'
  })
  public async delete(@Param('id') id: string): Promise<TeamDto> {
    return this.teamService.delete(id);
  }
}
