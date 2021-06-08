import { Module } from '@nestjs/common';
import { jwtConstants } from './auth/constant';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: jwtConstants.access_secret,
      signOptions: { expiresIn: jwtConstants.access_expired_time },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class ServiceModule {}
