import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@repository/user/user.schema';
import { UserRepository } from '@repository/user/user.repository';
import { CookieKeys } from '@service/auth/constant';
import { AllowRoles } from '@service/auth/roles.decorator';
import { RolesGuard } from '@service/auth/roles.guard';
import { JwtAuthGuard } from '../../service/auth/jwt-auth.guard';
import { Request } from 'express';
import { AuthService } from '@service/auth/auth.service';
import { Roles } from '@repository/role/role.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowRoles(Roles.Super, Roles.Admin, Roles.User)
  @Get('fetch')
  @Get('/obtain')
  async obtain(@Req() request: Request) {
    const accessToken = request.cookies[CookieKeys.ACCESS_TOKEN];

    const decodedUserInfo = (await this.authService.jwtDecode(
      accessToken,
    )) as User;

    const user = await this.userRepository.findOne(
      decodedUserInfo._id ? { _id: decodedUserInfo._id } : {},
    );

    delete user.token;
    delete user.authenticationHash;

    return user;
  }

  @Post('/create')
  async create(@Body() user: Partial<User>) {
    return await this.userRepository.insert(user);
  }

  @Put('/modify')
  async modify(@Query('_id') _id: string, @Body() user: Partial<User>) {
    return this.userRepository.update({ _id }, user);
  }

  @Delete('/delete')
  async delete(@Query('_id') _id: string) {
    return this.userRepository.remove({ _id });
  }
}
