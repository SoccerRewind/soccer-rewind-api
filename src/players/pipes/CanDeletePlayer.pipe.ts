import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PlayerCareerService } from '../../player-career/player-career.service';
import { PlayerCareerModel } from '../../player-career/player-career.model';

@Injectable()
export class CanDeletePlayerPipe implements PipeTransform {
    constructor(private readonly playerCareerService: PlayerCareerService) {}

    async transform(id: string): Promise<string> {
        const playerUsed: PlayerCareerModel[] = await this.playerCareerService._findAll({ playerId: id });
        if (playerUsed.length > 0) {
            throw new BadRequestException('Cannot delete this player');
        }
        return id;
    }
}
