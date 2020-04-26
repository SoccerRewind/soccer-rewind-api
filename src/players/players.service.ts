// import { Injectable } from '@nestjs/common';
// import { BaseService } from '../shared/base.service';
// import { PlayerModel } from './player.model';
// import { ReturnModelType } from '@typegoose/typegoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { CreatePlayerDto } from './dto/create.player.dto';
// import { PlayerDto } from './dto/player.dto';
// import { UpdatePlayerDto } from './dto/update.player.dto';
//
// @Injectable()
// export class PlayersService extends BaseService<PlayerModel> {
//     constructor(
//         @InjectModel(PlayerModel.modelName)
//         private readonly playerModel: ReturnModelType<typeof PlayerModel>,
//     ) {
//         super(playerModel);
//     }
//
//     public async getAll(): Promise<PlayerDto[]> {
//         const players: PlayerModel[] = await this._findAll();
//         return players.map(player => PlayersService.mapPlayerModelToDTO(player));
//     }
//
//     public async getById(id: string): Promise<PlayerDto> {
//         const player: PlayerModel = await this._findByIdAsync(id);
//         return PlayersService.mapPlayerModelToDTO(player);
//     }
//
//     public async create(inputPlayer: CreatePlayerDto): Promise<PlayerDto> {
//         const playerToCreate = this._createModel(inputPlayer);
//         playerToCreate._id = PlayersService.generateUniqueID(inputPlayer);
//
//         try {
//             await this._create(playerToCreate);
//             const player: PlayerModel = await this._findById(playerToCreate._id);
//             return PlayersService.mapPlayerModelToDTO(player);
//         } catch (e) {
//             throw e;
//         }
//     }
//
//     public async update(id: string, updatePlayer: UpdatePlayerDto): Promise<PlayerDto> {
//         await this._updateById(id, updatePlayer);
//         const player: PlayerModel = await this._findById(id);
//         return PlayersService.mapPlayerModelToDTO(player);
//     }
//
//     public async delete(id: string): Promise<PlayerDto> {
//         const player: PlayerModel = await this._findByIdAsync(id);
//         await this._deleteByIdAsync(id);
//         return PlayersService.mapPlayerModelToDTO(player);
//     }
//
//     public static mapPlayerModelToDTO(player: PlayerModel): PlayerDto {
//         return {
//             id: player._id,
//             firstName: player.firstName,
//             lastName: player.lastName,
//             name: player.name,
//             country: player.country,
//             faceImg: player.faceImg,
//         };
//     }
//
//     public static generateUniqueID(player: CreatePlayerDto) {
//         return player.name.toLowerCase().replace(/ /g, '_');
//     }
// }
