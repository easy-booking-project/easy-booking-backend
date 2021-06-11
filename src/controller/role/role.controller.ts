import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role } from '@repository/role/role.schema';
import { RoleRepository } from '@repository/role/role.repository';

@Controller('role')
export class RoleController {
  constructor(private readonly roleRepository: RoleRepository) {}

  @Get('/obtain')
  async obtain(@Query('_id') _id: string) {
    return await this.roleRepository.find(_id ? { _id } : {});
  }

  @Post('/create')
  async create(@Body() role: Partial<Role>) {
    return await this.roleRepository.insert(role);
  }

  @Put('/modify')
  async modify(@Query('_id') _id: string, @Body() role: Partial<Role>) {
    return this.roleRepository.update({ _id }, role);
  }

  @Delete('/delete')
  async delete(@Query('_id') _id: string) {
    return this.roleRepository.remove({ _id });
  }
}
