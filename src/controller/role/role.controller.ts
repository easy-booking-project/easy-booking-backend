import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role } from 'src/repository/role/role.schema';
import { RoleService } from 'src/repository/role/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async obtain(@Query('_id') _id: string) {
    return await this.roleService.find(_id ? { _id } : {});
  }

  @Post()
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
