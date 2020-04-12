import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from '../src/teams/teams.module';
import { TeamsService } from '../src/teams/teams.service';
import { TeamsUtils } from './utils/teams.utils';

describe('Teams', () => {
  let app: INestApplication;
  let teamService: TeamsService;
  let teamsUtils: TeamsUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          envFilePath: '.test.env'
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DATABASE.CONNECTION_STRING'),
            useNewUrlParser: true,
            useUnifiedTopology: true
          }),
          inject: [ConfigService]
        }),
        TeamsModule
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    teamService = moduleFixture.get<TeamsService>(TeamsService);
    teamsUtils = new TeamsUtils(app, teamService);
    await teamsUtils.DROP();

    await app.init();
  });

  it('should pass - create team', async () => {
    return teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201)
      .expect({
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Anglia"
      });
  });

  it('should pass - get team', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201);

    return teamsUtils.getTeam('team_1')
      .expect(200)
      .expect({
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Anglia"
      });
  });

  it('should fail - get team (team does not exist)', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201);

    return teamsUtils.getTeam('team_2')
      .expect(404)
      .expect({
        "statusCode": 404,
        "message": "Team with id: team_2 does not exist",
        "error": "Not Found"
      });
  });

  it('should fail - create team (invalid data)', async () => {
    return teamsUtils.createTeam({
        "name": "team 1",
        "country": "Anglia"
      })
      .expect(400)
      .expect({
        "statusCode": 400,
        "message": [
          "logo must be a string"
        ],
        "error": "Bad Request"
      })
  });

  it('should fail - create team (existing id)', async () => {
    const team = {
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    };

    await teamsUtils.createTeam(team).expect(201);
    return teamsUtils.createTeam(team)
      .expect(400)
      .expect({
        "statusCode": 400,
        "message": "Team with id: team_1 is already exist",
        "error": "Bad Request"
      })
  });

  it('should pass - get all teams', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201);

    await teamsUtils.createTeam({
      "name": "team 2",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201);

    return teamsUtils.getAllTeams()
      .expect(200)
      .expect([
        {
          "id": "team_1",
          "name": "team 1",
          "logo": "logo",
          "country": "Anglia"
        },
        {
          "id": "team_2",
          "name": "team 2",
          "logo": "logo",
          "country": "Anglia"
        }
      ])
  });

  it('should pass - get all teams (empty array)', async () => {
    return teamsUtils.getAllTeams()
      .expect(200)
      .expect([])
  });

  it('should pass - update team', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201)
      .expect({
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Anglia"
      });

    return teamsUtils.updateTeam('team_1', {
      "country": "Hiszpania"
    }).expect(200)
      .expect({
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Hiszpania"
      });
  });

  it('should fail - update team (team does not exist)', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201)
      .expect({
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Anglia"
      });

    return teamsUtils.updateTeam('team_2', {
      "country": "Hiszpania"
    }).expect(404)
      .expect({
        "statusCode": 404,
        "message": "Team with id: team_2 does not exist",
        "error": "Not Found"
      });
  });

  it('should fail - update team (id change)', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201)
      .expect({
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Anglia"
      });

    return teamsUtils.updateTeam('team_1', {"_id": "newId"}).expect(500)
  });

  it('should pass - delete team ', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201);

    await teamsUtils.getAllTeams().expect([
      {
        "id": "team_1",
        "name": "team 1",
        "logo": "logo",
        "country": "Anglia"
      }
    ]);

    await teamsUtils.deleteTeam('team_1').expect(200);
    return teamsUtils.getAllTeams().expect([]);
  });

  it('should fail - delete team (team does not exist)', async () => {
    await teamsUtils.createTeam({
      "name": "team 1",
      "logo": "logo",
      "country": "Anglia"
    }).expect(201);

    return teamsUtils.deleteTeam('team_2')
      .expect(404)
      .expect({
        "statusCode": 404,
        "message": "Team with id: team_2 does not exist",
        "error": "Not Found"
      });
  });


});
