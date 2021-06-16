import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { User } from '@repository/user/user.schema';
import { AuthService } from '@service/auth/auth.service';
import { Response } from 'express';
import { UserRepository } from '../../repository/user/user.repository';
import { RoleRepository } from '../../repository/role/role.repository';
import { Roles } from '@repository/role/role.schema';
import {
  CookieKeys,
  HttpResponseError,
  HttpResponseMessage,
} from '../../service/auth/constant';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() user: User) {
    try {
      const UserRole = await this.roleRepository.findOne({ name: Roles.User });

      if (!UserRole) {
        //TODO thing about better way of throwing this Error
        throw new Error('User Role Not Existed in DataBase');
      }

      user.roleIds = [UserRole._id];

      user.authenticationHash =
        this.authService.generateServerAuthenticationHash(user);
      await this.userRepository.insert(user);
    } catch (e) {
      switch (e.code) {
        // TODO use constant for this case
        // username duplicate exception
        case 11000:
          throw new HttpException(
            {
              status: HttpStatus.NOT_ACCEPTABLE,
              error: HttpResponseError.DUPLICATED_USER_NAME,
              message: HttpResponseMessage.DUPLICATED_USER_NAME,
            },
            HttpStatus.UNAUTHORIZED,
          );
        default:
          throw new Error(e);
      }
    }

    return user;
  }

  @Post('sign-in')
  async signIn(
    @Body() info: { username: string; authenticationHash: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login({
      username: info?.username || '',
      authenticationHash:
        this.authService.generateServerAuthenticationHash(info),
    } as User);

    if (!access_token) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.WRONG_CREDENTIALS,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    response.cookie(CookieKeys.ACCESS_TOKEN, access_token, { httpOnly: true });
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(CookieKeys.ACCESS_TOKEN);
  }
}
