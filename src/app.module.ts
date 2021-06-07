import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { RepositoryModule } from './repository/repository.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db'), // TODO move the connection string to a config file
    ControllerModule,
    RepositoryModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
