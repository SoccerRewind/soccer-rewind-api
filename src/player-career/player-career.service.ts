// import { Injectable } from '@nestjs/common';
// import { CreatePlayerCareerDto, CreatePlayerCareerItemDto } from './dto/create.player-career.dto';
// import { BaseService } from '../shared/base.service';
// import { PlayerCareerItem, PlayerCareerModel } from './player-career.model';
// import { InjectModel } from '@nestjs/mongoose';
// import { PlayerModel } from '../players/player.model';
// import { ReturnModelType } from '@typegoose/typegoose';
// import { PlayerService } from '../players/players.service';
// import { TeamService } from '../teams/teams.service';
// import { TeamModel } from '../teams/team.model';
// import { PlayerCareerDto, PlayerCareerItemDto } from './dto/player-career.dto';
// import { PlayerDto } from '../players/dto/player.dto';
//
// @Injectable()
// export class PlayerCareerService extends BaseService<PlayerCareerModel> {
//     constructor(
//         @InjectModel(PlayerCareerModel.modelName)
//         private readonly playerCareerModel: ReturnModelType<typeof PlayerCareerModel>,
//         private readonly playerService: PlayerService,
//         private readonly teamService: TeamService,
//     ) {
//         super(playerCareerModel);
//     }
//
//     public async getAllPlayerCareer() {
//         const careers = await this._findAll()
//             .populate('playerId')
//             .populate('teams.teamId');
//         return careers.map(i => PlayerCareerService.mapPlayerCareerModelToDTO(i));
//     }
//
//     public async getPlayerCareer(id: string) {
//         return this._findByIdAsync(id);
//     }
//
//     public async createPlayerCareer(playerCareer: CreatePlayerCareerDto) {
//         const newPlayerCareer = this._createModel(playerCareer);
//
//         newPlayerCareer.playerId = await this.playerService._findByIdAsync(playerCareer.playerId);
//         newPlayerCareer.teams = await this.createCareerItems(playerCareer.career);
//         newPlayerCareer._id = playerCareer.playerId;
//
//         try {
//             await this._create(newPlayerCareer);
//         } catch (e) {
//             throw e;
//         }
//     }
//
//     private async createCareerItems(careerItems: CreatePlayerCareerItemDto[]): Promise<PlayerCareerItem[]> {
//         const items: PlayerCareerItem[] = [];
//         for (const item of careerItems) {
//             const team: TeamModel = await this.teamService._findByIdAsync(item.teamId);
//             const careerItem: PlayerCareerItem = new PlayerCareerItem(team, item.from, item.to);
//             items.push(careerItem);
//         }
//         return items;
//     }
//
//     private static mapPlayerCareerModelToDTO(playerCareer: PlayerCareerModel): PlayerCareerDto {
//         const player: PlayerDto = PlayerService.mapPlayerModelToDTO(playerCareer.playerId as PlayerModel);
//
//         const teams: PlayerCareerItemDto[] = [];
//         // @TODO: what if team/player is null (deleted)?
//         for (const careerItem of playerCareer.teams) {
//             try {
//                 const a = TeamService.mapTeamModelToDTO(careerItem.teamId as TeamModel);
//                 teams.push({
//                     team: a,
//                     from: careerItem.from,
//                     to: careerItem.to,
//                 } as PlayerCareerItemDto);
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//         return {
//             player: player,
//             teams: teams,
//         } as PlayerCareerDto;
//     }
// }
