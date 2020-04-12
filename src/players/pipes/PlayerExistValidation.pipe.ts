import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PlayersService } from '../players.service';

@Injectable()
export class PlayerExistValidationPipe implements PipeTransform {
  constructor(private readonly playerService: PlayersService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'param') {
      if (!(await this.playerService._isExist(value))) {
        throw new NotFoundException(`Player with id: ${value} does not exist`);
      }
    } else if (metadata.type === 'body') {
      const id = PlayersService.generateUniqueID(value);
      if (await this.playerService._isExist(id)) {
        throw new BadRequestException(`Player with id: ${id} is already exist`);
      }
    }

    return value;
  }
}
