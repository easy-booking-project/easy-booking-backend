import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../repository/user/user.schema';
import { UserService } from '../../repository/user/user.service';
import { JwtAuthGuard } from '../../service/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async obtain(@Query('_id') _id: string) {
    return await this.userService.find(_id ? { _id } : {});
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
