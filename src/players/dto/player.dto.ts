import { IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { PlayerEntity } from '../player.entity';

export class PlayerDto {
    @IsString()
    public id: number;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public name: string;

    @IsString()
    public faceImg: string;

    @IsString()
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
    public name?: string;
}

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
