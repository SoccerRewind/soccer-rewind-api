import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
    @IsString()
    @ApiProperty()
    public id: string;

    @IsString()
    @ApiProperty()
    public firstName: string;

    @IsString()
    @ApiProperty()
    public lastName: string;

    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    public faceImg: string;

    @IsString()
    @ApiProperty()
    public country: string;
}
