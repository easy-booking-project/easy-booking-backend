import { AuthService } from './auth/auth.service';
import { JwtAuthStrategy } from '@service/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repository/repository.module';
import { JwtConstants } from './auth/constant';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: JwtConstants.access_secret,
      signOptions: { expiresIn: JwtConstants.access_expired_time },
    }),
  ],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService, JwtModule],
})
export class ServiceModule {}
