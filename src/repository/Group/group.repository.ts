import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { Group } from './group.schema';

@Injectable()
export class UserRepository extends RepositoryBase<Group> {
  constructor(@InjectModel(Group.name) model: Model<Group & Document>) {
    super(model);
  }
}
