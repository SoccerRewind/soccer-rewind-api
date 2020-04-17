import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
    @IsString()
    @ApiProperty()
    public id: string;

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
}
