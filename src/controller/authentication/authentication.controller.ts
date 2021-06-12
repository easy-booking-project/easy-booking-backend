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
import {
  CookieKeys,
  HttpResponseError,
  HttpResponseMessage,
} from '../../service/auth/constant';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() user: User) {
    return user;
  }

  @Post('sign-in')
  async signIn(
    @Body() info: { username: string; authenticationHash: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login({
      username: info?.username || '',
      authenticationHash: info?.authenticationHash || '',
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
