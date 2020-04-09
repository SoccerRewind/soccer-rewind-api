import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsString()
  @ApiProperty()
  public logo: string;

  @IsString()
  @ApiProperty()
  public country: string;
}
