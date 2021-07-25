import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CookieKeys } from './constant';
import { AuthService } from '@service/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

// TODO consider combine this with jwt guard and strategy
@Injectable()
export class RefreshToken implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.cookies[CookieKeys.ACCESS_TOKEN];

    const payload = (await this.jwtService.decode(accessToken)) as any;

    const response = context.switchToHttp().getResponse();

    response.cookie(
      CookieKeys.ACCESS_TOKEN,
      await this.authService.generateJwtAccessToken({
        _id: payload._id,
        roles: payload.roles,
      }),
      {
        httpOnly: true,
      },
    );

    return next.handle();
  }
}
