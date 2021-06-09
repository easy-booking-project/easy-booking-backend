import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from '@repository/repository.module';

import { jwtConstants } from './auth/constant';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from '@service/auth/jwt.strategy';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: jwtConstants.access_secret,
      signOptions: { expiresIn: jwtConstants.access_expired_time },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class ServiceModule {}
