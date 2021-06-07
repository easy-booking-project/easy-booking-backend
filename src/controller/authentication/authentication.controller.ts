import { Body, Controller, Post, Query } from '@nestjs/common';
import { User } from 'src/repository/user/user.schema';

@Controller('authentication')
export class AuthenticationController {
  @Post('sign-up')
  async signUp(@Body() user: User) {
    return user;
  }

  @Post('sign-in')
  async signIn(@Body() info: { username: string; authenticationHash: string }) {
    return info;
  }

  @Post('sign-out')
  async signOut(@Query() _id: string) {
    return _id;
  }
}
