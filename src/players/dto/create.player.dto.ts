import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlayerDto {
    @IsString()
    @ApiProperty()
    public firstName: string;

    @IsString()
    @ApiProperty()
    public lastName: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public name: string;

    @IsUrl()
    @ApiProperty()
    public faceImg: string;

    @IsString()
    @Length(3, 3)
    @ApiProperty()
    public country: string;
}
