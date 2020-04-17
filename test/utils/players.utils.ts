import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PlayersService } from '../../src/players/players.service';

export class PlayersUtils {
  private readonly PATH: string = '/players';

  constructor(
    private readonly app: INestApplication,
    private readonly playerService: PlayersService,
  ) {}

  public createPlayer(player: any) {
    return request(this.app.getHttpServer())
      .post(this.PATH)
      .send(player);
  }

  public updatePlayer(id: string, player: any) {
    return request(this.app.getHttpServer())
      .patch(`${this.PATH}/${id}`)
      .send(player);
  }

  public deletePlayer(id: string) {
    return request(this.app.getHttpServer()).delete(`${this.PATH}/${id}`);
  }

  public getAllPlayers() {
    return request(this.app.getHttpServer()).get(this.PATH);
  }

  public getPlayer(id: string) {
    return request(this.app.getHttpServer()).get(`${this.PATH}/${id}`);
  }

  public async DROP() {
    await this.playerService._deleteManyAsync({});
  }
}
