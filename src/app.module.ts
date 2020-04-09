import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { TypegooseModule } from 'nestjs-typegoose';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypegooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),

    TeamsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
