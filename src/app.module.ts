import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        TeamsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
