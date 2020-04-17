import { IsDateString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from '../../players/dto/player.dto';
import { TeamDto } from '../../teams/dto/team.dto';

export class PlayerCareerItemDto {
    @ValidateNested()
    @ApiProperty()
    public team: TeamDto;

    @IsDateString()
    @ApiProperty()
    public from: Date;

    @IsDateString()
    @ApiProperty()
    public to: Date;
}

export class PlayerCareerDto {
    @ValidateNested()
    @ApiProperty()
    public player: PlayerDto;

    @ValidateNested()
    @ApiProperty()
    public teams: PlayerCareerItemDto[];
}
