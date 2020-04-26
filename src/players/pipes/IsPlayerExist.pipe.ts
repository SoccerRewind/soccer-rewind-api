// import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
// import { PlayersService } from '../players.service';
//
// @Injectable()
// export class IsPlayerExistPipe implements PipeTransform {
//     constructor(private readonly playerService: PlayersService) {}
//
//     async transform(id: string): Promise<any> {
//         if (!(await this.playerService._isExist(id))) {
//             throw new NotFoundException(`Player with id: ${id} does not exist`);
//         }
//
//         return id;
//     }
// }
