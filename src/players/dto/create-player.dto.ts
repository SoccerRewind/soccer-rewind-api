import { IsArray, IsOptional, IsString } from 'class-validator';
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

  @IsString()
  @ApiProperty()
  public face: string;

  @IsString()
  @ApiProperty()
  public country: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  public teamIds: string[]
}