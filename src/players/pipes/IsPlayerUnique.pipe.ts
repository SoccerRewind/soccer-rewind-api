import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PlayersService } from '../players.service';
import { CreatePlayerDto } from '../dto/create.player.dto';

@Injectable()
export class IsPlayerUniquePipe implements PipeTransform {
    constructor(private readonly playerService: PlayersService) {}

    async transform(player: CreatePlayerDto): Promise<CreatePlayerDto> {
        const id = PlayersService.generateUniqueID(player);
        if (await this.playerService._isExist(id)) {
            throw new BadRequestException(`Player with id: ${id} is already exist`);
        }

        return player;
    }
}
