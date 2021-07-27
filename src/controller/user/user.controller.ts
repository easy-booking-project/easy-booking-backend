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
import { AllowRoles } from '@service/auth/roles.decorator';
import { UserInfo } from '@service/auth/user.decorator';
import { RolesGuard } from '@service/auth/roles.guard';
import { JwtAuthGuard } from '../../service/auth/jwt-auth.guard';
import { Request } from 'express';
import { AuthService } from '@service/auth/auth.service';
import { Roles } from '@repository/role/role.schema';
import { UserEntity } from '../../repository/user/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowRoles(Roles.Super, Roles.Admin, Roles.User)
  @Get('fetch')
  @Get('/obtain')
  async obtain(@Req() request: Request, @UserInfo() user: UserEntity) {
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
