import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SlotRepository } from '@repository/slot/slot.repository';
import { Slot } from '@repository/slot/slot.schema';
import { Roles } from '@repository/role/role.schema';
import { UserEntity } from '@repository/user/user.schema';
import { JwtAuthGuard } from '@service/auth/jwt-auth.guard';
import { AllowRoles } from '@service/auth/roles.decorator';
import { RolesGuard } from '@service/auth/roles.guard';
import { UserInfo } from '@service/auth/user.decorator';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotRepository: SlotRepository) {}

  @Get('/fetch')
  async fetchAllSlots() {
    return await this.slotRepository.find({});
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowRoles(Roles.Super, Roles.Admin, Roles.Member)
  @Post('/create')
  async create(@Body() slot: Partial<Slot>, @UserInfo() user: UserEntity) {
    slot.createdBy = user.id;
    slot.createdOn = new Date();

    return await this.slotRepository.insert(slot);
  }
}
