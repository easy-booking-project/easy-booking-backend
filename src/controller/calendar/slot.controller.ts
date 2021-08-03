import { Body, Controller, Get, Post } from '@nestjs/common';
import { SlotRepository } from '@repository/slot/slot.repository';
import { Slot } from '@repository/slot/slot.schema';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotRepository: SlotRepository) {}

  @Get('/fetch')
  async fetchAllSlots() {
    return await this.slotRepository.find({});
  }

  @Post('/create')
  async create(@Body() slot: Partial<Slot>) {
    return await this.slotRepository.insert(slot);
  }
}
