import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryModule } from './repository/repository.module';
import { ServiceModule } from './service/service.module';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    // NOTE: might have to import config module to other part of module
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV !== 'production' ? '.env.local' : '.env.prod',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(process.env['DATA_CONNECTION_STRING']);
        console.log(configService.dataBaseConnectionString);
        return {
          uri: configService.dataBaseConnectionString,
        };
      },
      inject: [ConfigService],
    }), // TODO add more configuration factories if necessary: https://www.npmjs.com/package/mongoose
    ControllerModule,
    RepositoryModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
