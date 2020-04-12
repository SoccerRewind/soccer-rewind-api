import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlayerHistoryItem {
  @IsString()
  @ApiProperty()
  public team: string;

  @IsString()
  @ApiProperty()
  public from: string;

  @IsString()
  @ApiProperty()
  public to: string;
}

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

  @ValidateNested()
  @IsOptional()
  @ApiPropertyOptional()
  public history: PlayerHistoryItem[]
}