import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { TeamEntity } from '../team.entity';

export class TeamDto {
    @IsString()
    @ApiProperty()
    public id: number;

    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    public shortName: string;

    @IsString()
    @ApiProperty()
    public logoImg: string;

    @IsString()
    @ApiProperty()
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
