import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePlayerCareerItemDto {
    @IsString()
    @ApiProperty()
    public teamId: string;

    @IsString()
    @ApiProperty()
    public from: string;

    @IsString()
    @ApiProperty()
    public to: string;
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
