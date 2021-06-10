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
  constructor(private readonly roleService: RoleRepository) {}

  @Get()
  async obtain(@Query('_id') _id: string) {
    return await this.roleService.find(_id ? { _id } : {});
  }

  @Post('create')
  async create(@Body() role: Partial<Role>) {
    return await this.roleService.insert(role);
  }

  @Put()
  async modify(@Query('_id') _id: string, @Body() role: Partial<Role>) {
    return this.roleService.update({ _id }, role);
  }

  @Delete()
  async delete(@Query('_id') _id: string) {
    return this.roleService.remove({ _id });
  }
}
