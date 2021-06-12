import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@repository/user/user.schema';
import { AuthService } from '@service/auth/auth.service';
import { JwtAuthGuard } from '@service/auth/jwt-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() user: User) {
    return user;
  }

  // TODO use Two token Auth
  @Post('sign-in')
  async signIn(@Body() info: { username: string; authenticationHash: string }) {
    return this.authService.login({
      username: info?.username || '',
      authenticationHash: info?.authenticationHash || '',
    } as User);
  }

  // TODO use cookie instead of header
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async signOut(@Req() req) {
    return this.authService.logout(req.user);
  }

  //   @UseGuards(JwtRefreshAuthGuard)
  //   @Post('refresh-access-token')
  //   async refreshAccessToken(@Req() req) {
  //     return this.authService.refreshToken(req.user);
  //   }
}
