import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TeamsService } from '../teams.service';

@Injectable()
export class IsTeamExistPipe implements PipeTransform {
    constructor(private readonly teamService: TeamsService) {}

    async transform(id: string): Promise<any> {
        if (!(await this.teamService._isExist(id))) {
            throw new NotFoundException(`Team with id: ${id} does not exist`);
        }

        return id;
    }
}
