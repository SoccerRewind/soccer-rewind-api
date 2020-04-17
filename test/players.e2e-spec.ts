import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersService } from '../src/players/players.service';
import { PlayersUtils } from './utils/players.utils';
import { PlayersModule } from '../src/players/players.module';

describe('Players', () => {
  let app: INestApplication;
  let playerService: PlayersService;
  let playersUtils: PlayersUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          envFilePath: '.test.env',
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DATABASE.CONNECTION_STRING'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }),
          inject: [ConfigService],
        }),
        PlayersModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    playerService = moduleFixture.get<PlayersService>(PlayersService);
    playersUtils = new PlayersUtils(app, playerService);
    await playersUtils.DROP();

    await app.init();
  });

  afterAll(async () => {
    await playersUtils.DROP();
  });

  it('should pass - create player', async () => {
    return playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201)
      .expect({
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'POL',
        faceImg: 'https://faceimg.com/face.png',
      });
  });

  it('should pass - get player', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201);

    return playersUtils
      .getPlayer('jan_kowalski')
      .expect(200)
      .expect({
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'POL',
        faceImg: 'https://faceimg.com/face.png',
      });
  });

  it('should fail - get player (player does not exist)', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201);

    return playersUtils
      .getPlayer('jan_nowak')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Player with id: jan_nowak does not exist',
        error: 'Not Found',
      });
  });

  it('should fail - create player (invalid data)', async () => {
    return playersUtils
      .createPlayer({
        firstName: 'Jan',
        country: 'POL',
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'lastName must be a string',
          'faceImg must be an URL address',
        ],
        error: 'Bad Request',
      });
  });

  it('should fail - create player (existing id)', async () => {
    const player = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      faceImg: 'https://faceimg.com/face.png',
      country: 'POL',
    };

    await playersUtils.createPlayer(player).expect(201);
    return playersUtils
      .createPlayer(player)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Player with id: jan_kowalski is already exist',
        error: 'Bad Request',
      });
  });

  it('should pass - get all players', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201);

    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Nowak',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201);

    return playersUtils
      .getAllPlayers()
      .expect(200)
      .expect([
        {
          id: 'jan_kowalski',
          firstName: 'Jan',
          lastName: 'Kowalski',
          name: 'Jan Kowalski',
          country: 'POL',
          faceImg: 'https://faceimg.com/face.png',
        },
        {
          id: 'jan_nowak',
          firstName: 'Jan',
          lastName: 'Nowak',
          name: 'Jan Nowak',
          country: 'POL',
          faceImg: 'https://faceimg.com/face.png',
        },
      ]);
  });

  it('should pass - get all players (empty array)', async () => {
    return playersUtils
      .getAllPlayers()
      .expect(200)
      .expect([]);
  });

  it('should pass - update player', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201)
      .expect({
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'POL',
        faceImg: 'https://faceimg.com/face.png',
      });

    return playersUtils
      .updatePlayer('jan_kowalski', {
        country: 'ESP',
      })
      .expect(200)
      .expect({
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'ESP',
        faceImg: 'https://faceimg.com/face.png',
      });
  });

  it('should fail - update player (player does not exist)', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201)
      .expect({
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'POL',
        faceImg: 'https://faceimg.com/face.png',
      });

    return playersUtils
      .updatePlayer('jan_nowak', {
        country: 'ESP',
      })
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Player with id: jan_nowak does not exist',
        error: 'Not Found',
      });
  });

  it('should fail - update player (id change)', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201)
      .expect({
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'POL',
        faceImg: 'https://faceimg.com/face.png',
      });

    return playersUtils
      .updatePlayer('jan_kowalski', { _id: 'newId' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['property _id should not exist'],
        error: 'Bad Request',
      });
  });

  it('should pass - delete player', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201);

    await playersUtils.getAllPlayers().expect([
      {
        id: 'jan_kowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        name: 'Jan Kowalski',
        country: 'POL',
        faceImg: 'https://faceimg.com/face.png',
      },
    ]);

    await playersUtils.deletePlayer('jan_kowalski').expect(200);
    return playersUtils.getAllPlayers().expect([]);
  });

  it('should fail - delete player (player does not exist)', async () => {
    await playersUtils
      .createPlayer({
        firstName: 'Jan',
        lastName: 'Kowalski',
        faceImg: 'https://faceimg.com/face.png',
        country: 'POL',
      })
      .expect(201);

    return playersUtils
      .deletePlayer('jan_nowak')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Player with id: jan_nowak does not exist',
        error: 'Not Found',
      });
  });
});
