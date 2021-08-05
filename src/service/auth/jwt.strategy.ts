import { Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CookieKeys,
  HttpResponseError,
  HttpResponseMessage,
  JwtConstants,
} from './constant';

import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '@repository/user/user.repository';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserEntity } from '@repository/user/user.schema';
import { Document } from 'mongoose';
import { RoleRepository } from '../../repository/role/role.repository';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    super({
      jwtFromRequest: (req: { cookies: { [x: string]: any } }) => {
        return req?.cookies?.[CookieKeys.ACCESS_TOKEN];
      },
      ignoreExpiration: false,
      secretOrKey: JwtConstants.access_secret,
    });
  }

  async validate(payload: any) {
    const userFound = await this.userRepository.findOne({
      _id: payload._id,
    });

    this.handleUserNotFound(userFound);
    this.handleUserTokenNotExist(userFound);
    this.handleUserRefreshTokenStillValid(userFound);

    const roles = await this.roleRepository.find({ _id: userFound.roleIds });

    return {
      id: userFound._id,
      username: userFound.username,
      nickname: userFound.nickname,
      firstName: userFound.firstName,
      middleName: userFound.middleName,
      lastName: userFound.lastName,
      roles,
    } as UserEntity;
  }

  private handleUserRefreshTokenStillValid(userFound: User & Document) {
    const refreshTokenStillValid = this.jwtService.verify(userFound.token, {
      secret: JwtConstants.refresh_secret,
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
