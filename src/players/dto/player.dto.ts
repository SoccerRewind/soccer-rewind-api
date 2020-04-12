import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlayerHistoryItem } from './create-player.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PlayerHistoryItemDto extends PlayerHistoryItem {}

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

  @ValidateNested()
  @ApiModelPropertyOptional({type: [PlayerHistoryItemDto]})
  public history: PlayerHistoryItemDto[];
}
