import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { TeamsService } from '../../teams/teams.service';

@Injectable()
export class PlayerCareerValidationPipe implements PipeTransform {
  constructor(private readonly teamService: TeamsService) {}

  async transform(inputPlayer: CreatePlayerDto): Promise<CreatePlayerDto> {
    if (inputPlayer.history) {
      for (const historyItem of inputPlayer.history) {
        if (!(await this.teamService._isExist(historyItem.team))) {
          throw new BadRequestException(
            `Team with id: ${historyItem.team} does not exist`,
          );
        }
      }
    }
    return inputPlayer;
  }
}
