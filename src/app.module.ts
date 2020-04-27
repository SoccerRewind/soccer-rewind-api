import { Module } from '@nestjs/common';
import { TeamModule } from './teams/team.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './players/player.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: '.dev.env',
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            logging: true,
            database: './db.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),
        TeamModule,
        PlayerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
