import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PlayerCareerService } from '../../player-career/player-career.service';
import { PlayerCareerModel } from '../../player-career/player-career.model';

@Injectable()
export class CanDeleteTeamPipe implements PipeTransform {
    constructor(private readonly playerCareerService: PlayerCareerService) {}

    async transform(id: string): Promise<string> {
        const teamUsed: PlayerCareerModel[] = await this.playerCareerService._findAll({
            'teams.teamId': { $in: [id] },
        });
        if (teamUsed.length > 0) {
            throw new BadRequestException('Cannot delete this team');
        }
        return id;
    }
}
