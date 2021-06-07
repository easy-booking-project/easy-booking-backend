import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { RepositoryBase } from '../repository.base';
import { User } from './user.schema';

@Injectable()
export class UserService extends RepositoryBase<User> {

    constructor(
        @InjectModel(User.name) model: Model<User & Document>
    ) {
        super(model);
    }

}
