import { Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CookieKeys,
  HttpResponseError,
  HttpResponseMessage,
  jwtConstants,
} from './constant';

import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '@repository/user/user.repository';
import { AuthService } from './auth.service';
import { differenceInSeconds } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { User } from '@repository/user/user.schema';
import { Document } from 'mongoose';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: (req: { cookies: { [x: string]: any } }) => {
        return req?.cookies?.[CookieKeys.ACCESS_TOKEN];
      },
      ignoreExpiration: false, // since we are using single token strategy
      secretOrKey: jwtConstants.access_secret,
    });
  }

  async validate(payload: any) {
    const userFound = await await this.userRepository.findOne({
      _id: payload._id,
    });

    this.handleUserNotFound(userFound);
    this.handleUserTokenNotExist(userFound);
    this.handleUserRefreshTokenStillValid(userFound);

    return await this.regeneratePayload(payload);
  }

  private async regeneratePayload(payload) {
    const refactoryPayload: any = {
      _id: payload._id,
      roles: payload.roles,
    };

    const timeDiff = differenceInSeconds(payload.exp * 1000, new Date());

    const access_token_refreshed = timeDiff < 300;

    refactoryPayload.access_token_refreshed = access_token_refreshed;

    if (access_token_refreshed) {
      refactoryPayload.access_token =
        await this.authService.generateJwtAccessToken({
          _id: payload._id,
          roles: payload.roles,
        });
    }
    return refactoryPayload;
  }

  private handleUserRefreshTokenStillValid(userFound: User & Document) {
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
  }

  private handleUserNotFound(userFound: User & Document) {
    if (!userFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.USER_NOT_FOUND,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private handleUserTokenNotExist(userFound: User & Document) {
    if (!userFound.token)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.INSUFFICIENT_PRIVILEGES,
          message: HttpResponseMessage.INSUFFICIENT_PRIVILEGES,
        },
        HttpStatus.UNAUTHORIZED,
      );
  }
}
