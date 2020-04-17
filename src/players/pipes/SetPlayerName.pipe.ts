import { Injectable, PipeTransform } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create.player.dto';

@Injectable()
export class SetPlayerNamePipe implements PipeTransform {
    async transform(inputPlayer: CreatePlayerDto): Promise<CreatePlayerDto> {
        if (!inputPlayer.name) {
            inputPlayer.name = `${inputPlayer.firstName} ${inputPlayer.lastName}`;
        }
        return inputPlayer;
    }
}
