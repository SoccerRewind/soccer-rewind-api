import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TeamsService } from '../../src/teams/teams.service';

export class TeamsUtils {
  constructor(private readonly app: INestApplication,
              private readonly teamService: TeamsService) {}

  public createTeam(team: any) {
    return request(this.app.getHttpServer())
      .post('/teams')
      .send(team)
  }

  public updateTeam(id: string, team: any) {
    return request(this.app.getHttpServer())
      .patch(`/teams/${id}`)
      .send(team);
  }

  public deleteTeam(id: string) {
    return request(this.app.getHttpServer())
      .delete(`/teams/${id}`);
  }

  public getAllTeams() {
    return request(this.app.getHttpServer())
      .get('/teams')
  }

  public getTeam(id: string) {
    return request(this.app.getHttpServer())
      .get(`/teams/${id}`)
  }

  public async DROP() {
    await this.teamService._deleteManyAsync({});
  }
}
