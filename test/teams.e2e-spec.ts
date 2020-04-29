// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import configuration from '../src/config/configuration';
// import { MongooseModule } from '@nestjs/mongoose';
// import { TeamsModule } from '../src/teams/teams.module';
// import { TeamsService } from '../src/teams/teams.service';
// import { TeamsUtils } from './utils/teams.utils';
//
// describe('Teams', () => {
//     let app: INestApplication;
//     let teamService: TeamsService;
//     let teamsUtils: TeamsUtils;
//
//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [
//                 ConfigModule.forRoot({
//                     load: [configuration],
//                     envFilePath: '.test.env',
//                 }),
//                 MongooseModule.forRootAsync({
//                     imports: [ConfigModule],
//                     useFactory: async (configService: ConfigService) => ({
//                         uri: configService.get<string>('DATABASE.CONNECTION_STRING'),
//                         useNewUrlParser: true,
//                         useUnifiedTopology: true,
//                     }),
//                     inject: [ConfigService],
//                 }),
//                 TeamsModule,
//             ],
//         }).compile();
//         app = moduleFixture.createNestApplication();
//         app.useGlobalPipes(
//             new ValidationPipe({
//                 whitelist: true,
//                 forbidNonWhitelisted: true,
//             }),
//         );
//
//         teamService = moduleFixture.get<TeamsService>(TeamsService);
//         teamsUtils = new TeamsUtils(app, teamService);
//         await teamsUtils.DROP();
//
//         await app.init();
//     });
//
//     afterAll(async () => {
//         await teamsUtils.DROP();
//     });
//
//     it('should pass - create team', async () => {
//         return teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201)
//             .expect({
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             });
//     });
//
//     it('should pass - get team', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201);
//
//         return teamsUtils
//             .getTeam('team_1')
//             .expect(200)
//             .expect({
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             });
//     });
//
//     it('should fail - get team (team does not exist)', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201);
//
//         return teamsUtils
//             .getTeam('team_2')
//             .expect(404)
//             .expect({
//                 statusCode: 404,
//                 message: 'Team with id: team_2 does not exist',
//                 error: 'Not Found',
//             });
//     });
//
//     it('should fail - create team (invalid data)', async () => {
//         return teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 country: 'GBR',
//             })
//             .expect(400)
//             .expect({
//                 statusCode: 400,
//                 message: ['shortName must be a string', 'logoImg must be an URL address'],
//                 error: 'Bad Request',
//             });
//     });
//
//     it('should fail - create team (existing id)', async () => {
//         const team = {
//             name: 'team 1',
//             shortName: 't1',
//             logoImg: 'https://logoimg.com/logo.png',
//             country: 'GBR',
//         };
//
//         await teamsUtils.createTeam(team).expect(201);
//         return teamsUtils
//             .createTeam(team)
//             .expect(400)
//             .expect({
//                 statusCode: 400,
//                 message: 'Team with id: team_1 is already exist',
//                 error: 'Bad Request',
//             });
//     });
//
//     it('should pass - get all teams', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201);
//
//         await teamsUtils
//             .createTeam({
//                 name: 'team 2',
//                 shortName: 't2',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201);
//
//         return teamsUtils
//             .getAllTeams()
//             .expect(200)
//             .expect([
//                 {
//                     id: 'team_1',
//                     name: 'team 1',
//                     shortName: 't1',
//                     logoImg: 'https://logoimg.com/logo.png',
//                     country: 'GBR',
//                 },
//                 {
//                     id: 'team_2',
//                     name: 'team 2',
//                     shortName: 't2',
//                     logoImg: 'https://logoimg.com/logo.png',
//                     country: 'GBR',
//                 },
//             ]);
//     });
//
//     it('should pass - get all teams (empty array)', async () => {
//         return teamsUtils
//             .getAllTeams()
//             .expect(200)
//             .expect([]);
//     });
//
//     it('should pass - update team', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201)
//             .expect({
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             });
//
//         return teamsUtils
//             .updateTeam('team_1', {
//                 country: 'ESP',
//             })
//             .expect(200)
//             .expect({
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'ESP',
//             });
//     });
//
//     it('should fail - update team (team does not exist)', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201)
//             .expect({
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             });
//
//         return teamsUtils
//             .updateTeam('team_2', {
//                 country: 'ESP',
//             })
//             .expect(404)
//             .expect({
//                 statusCode: 404,
//                 message: 'Team with id: team_2 does not exist',
//                 error: 'Not Found',
//             });
//     });
//
//     it('should fail - update team (id change)', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201)
//             .expect({
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             });
//
//         return teamsUtils
//             .updateTeam('team_1', { _id: 'newId' })
//             .expect(400)
//             .expect({
//                 statusCode: 400,
//                 message: ['property _id should not exist'],
//                 error: 'Bad Request',
//             });
//     });
//
//     it('should pass - delete team', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201);
//
//         await teamsUtils.getAllTeams().expect([
//             {
//                 id: 'team_1',
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             },
//         ]);
//
//         await teamsUtils.deleteTeam('team_1').expect(200);
//         return teamsUtils.getAllTeams().expect([]);
//     });
//
//     it('should fail - delete team (team does not exist)', async () => {
//         await teamsUtils
//             .createTeam({
//                 name: 'team 1',
//                 shortName: 't1',
//                 logoImg: 'https://logoimg.com/logo.png',
//                 country: 'GBR',
//             })
//             .expect(201);
//
//         return teamsUtils
//             .deleteTeam('team_2')
//             .expect(404)
//             .expect({
//                 statusCode: 404,
//                 message: 'Team with id: team_2 does not exist',
//                 error: 'Not Found',
//             });
//     });
// });
