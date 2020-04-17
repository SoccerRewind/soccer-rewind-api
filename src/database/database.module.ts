import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeamModel } from '../teams/team.model';
import { PlayerModel } from '../players/player.model';
import { PlayerCareerModel } from '../player-career/player-career.model';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DATABASE.CONNECTION_STRING'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            {
                name: TeamModel.modelName,
                schema: TeamModel.schema,
                collection: 'teams',
            },
            {
                name: PlayerModel.modelName,
                schema: PlayerModel.schema,
                collection: 'players',
            },
            {
                name: PlayerCareerModel.modelName,
                schema: PlayerCareerModel.schema,
                collection: 'player-career',
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
