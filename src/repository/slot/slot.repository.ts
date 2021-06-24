import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { Slot } from './slot.schema';

@Injectable()
export class SlotRepository extends RepositoryBase<Slot> {
  constructor(@InjectModel(Slot.name) model: Model<Slot & Document>) {
    super(model);
  }
}
