import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
    constructor(message: string) {
        this.message = message;
    }

    @IsNumber()
    @ApiProperty()
    public readonly statusCode: number = 200;

    @IsString()
    @ApiProperty()
    public readonly message: string;
}
