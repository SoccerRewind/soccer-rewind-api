import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dto/team.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IsTeamExistPipe } from './pipes/IsTeamExist.pipe';
import { SuccessResponse } from '../shared/success.response';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
    constructor(private teamService: TeamsService) {}

    @Get()
    @ApiOkResponse({
        description: 'Return all teams from database',
        type: [TeamDto],
    })
    public async getAll(): Promise<TeamDto[]> {
        return this.teamService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Return specific team',
        type: TeamDto,
    })
    @ApiNotFoundResponse({
        description: 'Team does not exist',
    })
    public async getById(@Param('id', IsTeamExistPipe) id: string): Promise<TeamDto> {
        return this.teamService.getById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Team created successfully',
        type: TeamDto,
    })
    public async create(@Body() team: CreateTeamDto): Promise<TeamDto> {
        return this.teamService.create(team);
    }

    @Patch(':id')
    @ApiOkResponse({
        description: 'Return updated team',
        type: TeamDto,
    })
    @ApiNotFoundResponse({
        description: 'Team does not exist',
    })
    public async update(@Param('id', IsTeamExistPipe) id: string, @Body() team: UpdateTeamDto): Promise<TeamDto> {
        return this.teamService.update(id, team);
    }

    @Delete(':id')
    @ApiOkResponse({
        type: SuccessResponse,
    })
    @ApiNotFoundResponse({
        description: 'Team does not exist',
    })
    public async delete(@Param('id', IsTeamExistPipe) id: string): Promise<SuccessResponse> {
        return this.teamService.delete(id);
    }
}
