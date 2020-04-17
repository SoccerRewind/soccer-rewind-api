import { IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    public shortName: string;

    @IsUrl()
    @ApiProperty()
    public logoImg: string;

    @IsString()
    @Length(3, 3)
    @ApiProperty()
    public country: string;
}
