import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { Role } from './role.schema';

@Injectable()
export class RoleService extends RepositoryBase<Role> {
  constructor(@InjectModel(Role.name) model: Model<Role & Document>) {
    super(model);
  }
}
