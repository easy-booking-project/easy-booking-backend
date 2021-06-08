import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Mongoose } from 'mongoose';
import { RepositoryBase } from '../repository.base';
import { User } from './user.schema';

@Injectable()
export class UserService extends RepositoryBase<User> {
  constructor(@InjectModel(User.name) model: Model<User & Document>) {
    super(model);
  }

  public async findUserByNameAndToken(
    username: string,
    token: string,
  ): Promise<User> {
    return {
      username: 'will',
      authenticationHash: 'authHash',
      roleId: 'roleId',
      nickname: 'nick',
      firstName: 'firstName',
      middleName: 'middle',
      lastName: 'Last',
      token: '123',
    } as User;
  }
}
