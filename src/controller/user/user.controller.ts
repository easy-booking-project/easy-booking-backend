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
import { UserService } from '@repository/user/user.service';
import { Role } from '@service/auth/constant';
import { JwtAuthGuard } from '@service/auth/jwt-auth.guard';
import { Roles } from '@service/auth/roles.decorator';
import { RolesGuard } from '@service/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('fetch')
  @Roles(Role.Admin)
  async obtain(@Req() req) {
    return await this.userService.find(
      req.user._id ? { _id: req.user._id } : {},
    );
  }

  @Post()
  async create(@Body() user: Partial<User>) {
    return await this.userService.insert(user);
  }

  @Put()
  async modify(@Query('_id') _id: string, @Body() user: Partial<User>) {
    return this.userService.update({ _id }, user);
  }

  @Delete()
  async delete(@Query('_id') _id: string) {
    return this.userService.remove({ _id });
  }
}
