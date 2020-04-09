import { PartialType } from '@nestjs/swagger';
import { InputTeamDto } from './input-team.dto';

export class UpdateTeamDto extends PartialType(InputTeamDto) {}
