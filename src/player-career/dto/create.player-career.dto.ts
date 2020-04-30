import { IsDateString, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PlayerCareerEntity } from '../player-career.entity';

export class CreatePlayerCareerItemDto {
    @IsNumber()
    @ApiProperty()
    public teamId: number;

    @IsDateString()
    @ApiProperty()
    public dateFrom: Date;

    @IsDateString()
    @ApiProperty()
    public dateTo: Date;
}

export class CreatePlayerCareerDto {
    @IsNumber()
    @ApiProperty()
    public playerId: number;

    @ValidateNested()
    @ApiProperty({
        type: [CreatePlayerCareerItemDto],
    })
    @Type(() => CreatePlayerCareerItemDto)
    public career: CreatePlayerCareerItemDto[];

    public toEntities(): PlayerCareerEntity[] {
        const entities: PlayerCareerEntity[] = [];
        for (const item of this.career) {
            const entity = new PlayerCareerEntity();
            entity.playerId = this.playerId;
            entity.teamId = item.teamId;
            entity.dateFrom = item.dateFrom;
            entity.dateTo = item.dateTo;
            entities.push(entity);
        }
        return entities;
    }
}
