import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as cm } from '@nestjs/config';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends cm {}
