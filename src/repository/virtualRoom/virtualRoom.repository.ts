import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { virtualRoom } from './virtualRoom.schema';

@Injectable()
export class virtualRoomRepository extends RepositoryBase<virtualRoom> {
  constructor(
    @InjectModel(virtualRoom.name) model: Model<virtualRoom & Document>,
  ) {
    super(model);
  }
}
