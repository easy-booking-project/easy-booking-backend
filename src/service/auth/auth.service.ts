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

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
  ) {}

  async fetchUserWithRole(username: string) {
    const user = await this.userRepository.findOne({ username: username });

    const roles = await this.roleRepository.find({
      //   _id: [user.roleId],
      _id: ['60c0432fe396c169f48e06f1'],
    });

    return {
      user,
      roles,
    };
  }

  async generateJwtAccessToken(payload) {
    // TODO change this so payload only contain id, do async fetch in guard
    return await this.jwtService.sign(payload, {
      secret: jwtConstants.access_secret,
      expiresIn: jwtConstants.access_expired_time,
    });
  }

  async login(user: User) {
    // const payload = await this.userRepository.findOne({ username: user.username });

    const payload = await this.fetchUserWithRole(user.username);

    // TODO change this to compare hash
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

      await this.userRepository.update(
        { _id: payload.user._id },
        { token: access_token },
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
}
