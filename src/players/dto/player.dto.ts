import { IsArray, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  public face: string;

  @IsString()
  @ApiProperty()
  public country: string;

  @IsArray()
  @ApiPropertyOptional()
  public teams: any[]
}