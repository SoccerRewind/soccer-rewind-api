import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.dev.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE.MONGODB') + configService.get<string>('DATABASE.NAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    TeamsModule,
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
