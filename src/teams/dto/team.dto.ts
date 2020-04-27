import { IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { TeamEntity } from '../team.entity';

export class TeamDto {
    @IsString()
    public id: number;

    @IsString()
    public name: string;

    @IsString()
    public shortName: string;

    @IsString()
    public logoImg: string;

    @IsString()
    public country: string;

    public static fromEntity(team: TeamEntity): TeamDto {
        const dto = new TeamDto();
        dto.id = team.id;
        dto.name = team.name;
        dto.shortName = team.shortName;
        dto.logoImg = team.logoImg;
        dto.country = team.country;
        return dto;
    }
}

export class CreateTeamDto extends OmitType(TeamDto, ['id']) {}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
