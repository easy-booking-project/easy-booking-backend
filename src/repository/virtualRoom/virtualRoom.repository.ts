import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { VirtualRoom } from './VirtualRoom.schema';

@Injectable()
export class VirtualRoomRepository extends RepositoryBase<VirtualRoom> {
  constructor(
    @InjectModel(VirtualRoom.name) model: Model<VirtualRoom & Document>,
  ) {
    super(model);
  }
}
