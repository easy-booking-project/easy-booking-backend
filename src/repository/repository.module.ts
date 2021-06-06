import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './test/test.schema';
import { TestService } from './test/test.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Test.name, schema: TestSchema }
    ])
  ],
  providers: [TestService],
  exports: [TestService]
})
export class RepositoryModule { }
