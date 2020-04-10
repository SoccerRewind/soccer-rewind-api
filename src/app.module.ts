import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    TeamsModule,
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
