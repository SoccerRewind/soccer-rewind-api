// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { PlayerCareerService } from './player-career.service';
// import { CreatePlayerCareerDto } from './dto/create.player-career.dto';
// import { PlayerCareerValidationPipe } from './pipes/PlayerCareerValidation.pipe';
// import { ApiTags } from '@nestjs/swagger';
//
// @ApiTags('Player career history')
// @Controller('player-career')
// export class PlayerCareerController {
//     constructor(private playerCareerService: PlayerCareerService) {}
//
//     @Get()
//     public async getAllPlayerCareer() {
//         return this.playerCareerService.getAllPlayerCareer();
//     }
//
//     @Get(':id')
//     public async getPlayerCareer(@Param('id') id: string) {
//         return this.playerCareerService.getPlayerCareer(id);
//     }
//
//     @Post()
//     public async createPlayerCareer(@Body(PlayerCareerValidationPipe) playerCareer: CreatePlayerCareerDto) {
//         return this.playerCareerService.createPlayerCareer(playerCareer);
//     }
// }
