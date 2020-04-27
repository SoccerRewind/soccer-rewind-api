import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PlayerEntity } from '../player.entity';

export class PlayerDto {
    @IsString()
    @ApiProperty()
    public id: number;

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

    public static fromEntity(player: PlayerEntity): PlayerDto {
        const dto = new PlayerDto();
        dto.id = player.id;
        dto.firstName = player.firstName;
        dto.lastName = player.lastName;
        dto.name = player.name;
        dto.faceImg = player.faceImg;
        dto.country = player.country;
        return dto;
    }
}

export class CreatePlayerDto extends OmitType(PlayerDto, ['id', 'name']) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public name?: string;
}

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
