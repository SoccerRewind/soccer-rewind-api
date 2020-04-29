import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TeamsService } from '../../src/teams/teams.service';

export class TeamsUtils {
    private readonly PATH: string = '/teams';

    constructor(private readonly app: INestApplication, private readonly teamService: TeamsService) {}

    public createTeam(team: any) {
        return request(this.app.getHttpServer())
            .post(this.PATH)
            .send(team);
    }

    public updateTeam(id: string, team: any) {
        return request(this.app.getHttpServer())
            .patch(`${this.PATH}/${id}`)
            .send(team);
    }

    public deleteTeam(id: string) {
        return request(this.app.getHttpServer()).delete(`${this.PATH}/${id}`);
    }

    public getAllTeams() {
        return request(this.app.getHttpServer()).get(this.PATH);
    }

    public getTeam(id: string) {
        return request(this.app.getHttpServer()).get(`${this.PATH}/${id}`);
    }

    public async DROP() {
        await this.teamService._deleteManyAsync({});
    }
}
