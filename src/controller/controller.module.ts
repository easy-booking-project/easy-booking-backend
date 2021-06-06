import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { TestController } from './test/test.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [TestController]
})
export class ControllerModule { }
