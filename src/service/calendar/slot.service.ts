import { Injectable } from '@nestjs/common';
import { SlotRepository } from '@repository/slot/slot.repository';

Injectable();
export class SlotService {
  constructor(private slotRepository: SlotRepository) {}
}
