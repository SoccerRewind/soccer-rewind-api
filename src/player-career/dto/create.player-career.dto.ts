import { IsDateString, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePlayerCareerItemDto {
    @IsString()
    @ApiProperty()
    public teamId: string;

    @IsDateString()
    @ApiProperty()
    public from: Date;

    @IsDateString()
    @ApiProperty()
    public to: Date;
}

export class CreatePlayerCareerDto {
    @IsString()
    @ApiProperty()
    public playerId: string;

    @ValidateNested()
    @ApiProperty()
    @Type(() => CreatePlayerCareerItemDto)
    public career: CreatePlayerCareerItemDto[];
}
