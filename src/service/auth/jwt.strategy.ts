import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  HttpResponseError,
  HttpResponseMessage,
  jwtConstants,
} from './constant';

import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '@repository/user/user.repository';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.access_secret,
    });
  }

  async validate(payload: any) {
    return { _id: payload._id, roles: payload.roles };
  }
}

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh_secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({ _id: payload._id });

    // if no user has been found
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.USER_NOT_FOUND,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // if user does not have refresh token (user has been logout)
    if (!user.token) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.INSUFFICIENT_PRIVILEGES,
          message: HttpResponseMessage.INSUFFICIENT_PRIVILEGES,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return payload;
  }
}
