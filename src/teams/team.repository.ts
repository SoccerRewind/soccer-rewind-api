import { EntityRepository } from 'typeorm';
import { TeamEntity } from './team.entity';
import { BaseRepository } from '../shared/base.repository';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';

@EntityRepository(TeamEntity)
export class TeamRepository extends BaseRepository<TeamEntity, CreateTeamDto, UpdateTeamDto> {}
