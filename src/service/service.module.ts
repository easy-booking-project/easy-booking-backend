import { AuthService } from './auth/auth.service';
import { JwtAccessStrategy } from '@service/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repository/repository.module';
import { jwtConstants } from './auth/constant';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: jwtConstants.access_secret,
      signOptions: { expiresIn: jwtConstants.access_expired_time },
    }),
  ],
  providers: [AuthService, JwtAccessStrategy],
  exports: [AuthService],
})
export class ServiceModule {}
