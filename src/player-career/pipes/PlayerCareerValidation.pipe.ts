// import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
// import { PlayersService } from '../../players/players.service';
// import { CreatePlayerCareerDto } from '../dto/create.player-career.dto';
// import { TeamsService } from '../../teams/teams.service';
//
// @Injectable()
// export class PlayerCareerUpdateValidationPipe implements PipeTransform {
//     constructor(private readonly playerService: PlayersService, private readonly teamService: TeamsService) {}
//
//     async transform(data: CreatePlayerCareerDto): Promise<any> {
//         if (!(await this.playerService._isExist(data.playerId))) {
//             throw new NotFoundException(`Player with id: ${data.playerId} does not exist`);
//         }
//
//         for (const careerItem of data.career) {
//             if (!(await this.teamService._isExist(careerItem.teamId))) {
//                 throw new NotFoundException(`Team with id: ${careerItem.teamId} does not exist`);
//             }
//         }
//
//         return data;
//     }
// }
//
// @Injectable()
// export class PlayerCareerValidationPipe extends PlayerCareerUpdateValidationPipe {
//     async transform(data: CreatePlayerCareerDto): Promise<any> {
//         if (!data.career || data.career.length == 0) {
//             throw new BadRequestException('Missing teams');
//         }
//         return super.transform(data);
//     }
// }
