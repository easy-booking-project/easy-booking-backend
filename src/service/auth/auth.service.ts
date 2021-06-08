import { HttpException, Injectable } from '@nestjs/common';
import {
  HttpResponseError,
  HttpResponseMessage,
  HttpStatus,
  jwtConstants,
} from './constant';

import { JwtService } from '@nestjs/jwt';
import { User } from '../../repository/user/user.schema';
import { UserService } from '../../repository/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateJwtAccessToken(payload): Promise<string> {
    return await this.jwtService.sign(payload, {
      secret: jwtConstants.access_secret,
      expiresIn: jwtConstants.access_expired_time,
    });
  }

  async validateToken(userId: string, token: string): Promise<boolean> {
    const user = await this.userService.findUserByNameAndToken(userId, token);

    return !!user.token;
  }

  async login(user: User) {
    const payload = await this.userService.findUserByNameAndToken(
      user.username,
      user.authenticationHash,
    );

    // TODO change this to compare hash
    if (payload.authenticationHash === user.authenticationHash) {
      // remove token and auth hash from payload
      delete payload.token;
      delete payload.authenticationHash;

      return {
        access_token: await this.generateJwtAccessToken(payload),
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
}
