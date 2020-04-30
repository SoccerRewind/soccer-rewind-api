import { IsDateString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from '../../players/dto/player.dto';
import { TeamDto } from '../../teams/dto/team.dto';
import { PlayerCareerEntity } from '../player-career.entity';
import { Type } from 'class-transformer';

export class PlayerCareerItemDto {
    @ValidateNested()
    @ApiProperty()
    public team: TeamDto;

    @IsDateString()
    @ApiProperty()
    public dateFrom: Date;

    @IsDateString()
    @ApiProperty()
    public dateTo: Date;
}

export class PlayerCareerDto {
    @ValidateNested()
    @ApiProperty()
    public player: PlayerDto;

    @ValidateNested()
    @Type(() => PlayerCareerItemDto)
    @ApiProperty({
        type: [PlayerCareerItemDto],
    })
    public teams: PlayerCareerItemDto[];

    public static fromEntity(entity: PlayerCareerEntity): PlayerCareerDto {
        const dto = new PlayerCareerDto();
        dto.player = PlayerDto.fromEntity(entity.player);
        dto.teams = [
            {
                team: TeamDto.fromEntity(entity.team),
                dateFrom: entity.dateFrom,
                dateTo: entity.dateTo,
            },
        ];
        return dto;
    }

    public static fromEntities(entities: PlayerCareerEntity[]): PlayerCareerDto {
        const dto = new PlayerCareerDto();
        dto.player = PlayerDto.fromEntity(entities[0].player);
        dto.teams = entities.map(entity => {
            return {
                team: TeamDto.fromEntity(entity.team),
                dateFrom: entity.dateFrom,
                dateTo: entity.dateTo,
            };
        });
        return dto;
    }
}
