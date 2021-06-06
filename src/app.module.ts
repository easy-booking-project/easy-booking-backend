import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db'),
    ControllerModule,
    RepositoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
