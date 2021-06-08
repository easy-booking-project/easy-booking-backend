import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  HttpResponseError,
  HttpResponseMessage,
  jwtConstants,
} from './constant';

import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.access_secret,
    });
  }

  async validate(payload: any) {
    const tokenValid = await this.authService.validateToken(
      payload.userId,
      payload.tokenId,
    );

    if (!tokenValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.TOKEN_EXPIRED,
          message: HttpResponseMessage.TOKEN_EXPIRED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return payload;
  }
}
