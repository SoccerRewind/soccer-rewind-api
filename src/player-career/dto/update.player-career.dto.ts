import { PartialType } from '@nestjs/swagger';
import { CreatePlayerCareerDto, CreatePlayerCareerItemDto } from './create.player-career.dto';

export class UpdatePlayerCareerDto extends PartialType(CreatePlayerCareerDto) {}
export class UpdatePlayerCareerItemDto extends CreatePlayerCareerItemDto {}
