import { Body, Controller, Post, Query } from '@nestjs/common';
import { User } from '../../repository/user/user.schema';
import { AuthService } from '../../service/auth/auth.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() user: User) {
    return user;
  }

  @Post('sign-in')
  async signIn(@Body() info: { username: string; authenticationHash: string }) {
    // return info;
    console.log('--- info ---', info);
    return this.authService.login({
      username: info?.username || '',
      authenticationHash: info?.authenticationHash || '',
    } as User);
  }

  @Post('sign-out')
  async signOut(@Query() _id: string) {
    return _id;
  }
}
