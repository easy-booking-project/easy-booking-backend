import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@repository/user/user.schema';
import { UserRepository } from '@repository/user/user.repository';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async obtain(@Query('_id') _id: string) {
    return await this.userRepository.find(_id ? { _id } : {});
  }

  @Post()
  async create(@Body() user: Partial<User>) {
    return await this.userRepository.insert(user);
  }

  @Put()
  async modify(@Query('_id') _id: string, @Body() user: Partial<User>) {
    return this.userRepository.update({ _id }, user);
  }

  @Delete()
  async delete(@Query('_id') _id: string) {
    return this.userRepository.remove({ _id });
  }
}
