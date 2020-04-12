import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TeamsService } from '../teams.service';

@Injectable()
export class TeamExistValidationPipe implements PipeTransform {
  constructor(private readonly teamService: TeamsService) { }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'param') {
      if (!(await this.teamService._isExist(value))) {
        throw new NotFoundException(`Team with id: ${value} does not exist`);
      }
    } else if (metadata.type === 'body') {
      const id = TeamsService.generateUniqueID(value);
      if (await this.teamService._isExist(id)) {
        throw new BadRequestException(`Team with id: ${id} is already exist`);
      }
    }

    return value;
  }
}