import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  HttpResponseError,
  HttpResponseMessage,
  jwtConstants,
} from './constant';

import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '@repository/user/user.repository';
import { AuthService } from './auth.service';
import { differenceInSeconds } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.access_secret,
    });
  }

  async validate(payload: any) {
    const userFound = await await this.userRepository.findOne({
      _id: payload._id,
    });

    if (!userFound)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.USER_NOT_FOUND,
        },
        HttpStatus.UNAUTHORIZED,
      );

    if (!userFound.token)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.INSUFFICIENT_PRIVILEGES,
          message: HttpResponseMessage.INSUFFICIENT_PRIVILEGES,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const refreshTokenStillValid = this.jwtService.verify(userFound.token, {
      secret: jwtConstants.refresh_secret,
    });

    if (!refreshTokenStillValid)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.TOKEN_EXPIRED,
          message: HttpResponseMessage.TOKEN_EXPIRED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const refactoryPayload: any = {
      _id: payload._id,
      roles: payload.roles,
    };

    const timeDiff = differenceInSeconds(payload.exp * 1000, new Date());

    const refreshToken = timeDiff < 300;

    refactoryPayload.refreshToken = refreshToken;

    if (refreshToken) {
      refactoryPayload.access_token = this.authService.generateJwtAccessToken({
        _id: payload._id,
        roles: payload.roles,
      });
    }

    return refactoryPayload;
  }
}

@Injectable()
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
