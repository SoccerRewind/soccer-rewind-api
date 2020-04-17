import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TeamsService } from '../teams.service';
import { CreateTeamDto } from '../dto/create.team.dto';

@Injectable()
export class IsTeamUniquePipe implements PipeTransform {
    constructor(private readonly teamService: TeamsService) {}

    async transform(team: CreateTeamDto): Promise<any> {
        const id = TeamsService.generateUniqueID(team);
        if (await this.teamService._isExist(id)) {
            throw new BadRequestException(`Team with id: ${id} is already exist`);
        }

        return team;
    }
}
