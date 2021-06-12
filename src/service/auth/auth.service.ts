import { HttpException, Injectable } from '@nestjs/common';
import {
  HttpResponseError,
  HttpResponseMessage,
  HttpStatus,
  jwtConstants,
} from './constant';

import { JwtService } from '@nestjs/jwt';
import { RoleRepository } from '@repository/role/role.repository';
import { User } from '../../repository/user/user.schema';
import { UserRepository } from '@repository/user/user.repository';
import { differenceInSeconds } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = await this.fetchUserWithRole(user.username);

    if (payload.user.authenticationHash === user.authenticationHash) {
      const access_token = await this.generateJwtAccessToken({
        _id: payload.user._id,
        roles: payload.roles.reduce((acc, current) => {
          if (!acc) {
            return [];
          }
          acc.push(current.name);
          return acc;
        }, []),
      });

      const refresh_token = await this.generateJwtRefreshToken({
        _id: payload.user.id,
        roles: payload.roles,
      });

      await this.userRepository.update(
        { _id: payload.user._id },
        { token: refresh_token },
      );

      return {
        access_token,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.WRONG_CREDENTIALS,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async logout(user: User) {
    const payload = await this.userRepository.findOne({ _id: user._id });

    if (!!payload) {
      await this.userRepository.update({ _id: payload._id }, { token: null });

      return {
        status: HttpStatus.OK,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.USER_NOT_FOUND,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async fetchUserWithRole(username: string) {
    const user = await this.userRepository.findOne({ username: username });

    const roles = await this.roleRepository.find({
      _id: user.roleId,
    });

    return {
      user,
      roles,
    };
  }

  public async generateJwtAccessToken(payload) {
    // TODO change this so payload only contain id, do async fetch in guard
    return await this.jwtService.sign(payload, {
      secret: jwtConstants.access_secret,
      expiresIn: jwtConstants.access_expired_time,
    });
  }

  public async generateJwtRefreshToken(payload) {
    // TODO change this so payload only contain id, do async fetch in guard
    return await this.jwtService.sign(payload, {
      secret: jwtConstants.refresh_secret,
      expiresIn: jwtConstants.refresh_expired_time,
    });
  }
}
