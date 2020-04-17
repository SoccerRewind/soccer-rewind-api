import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { PlayerCareerModule } from './player-career/player-career.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: '.dev.env',
        }),
        DatabaseModule,
        TeamsModule,
        PlayersModule,
        PlayerCareerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
