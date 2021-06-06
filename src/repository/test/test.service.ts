import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { RepositoryBase } from '../repository.base';
import { Test } from './test.schema';

@Injectable()
export class TestService extends RepositoryBase<Test> {

    constructor(
        @InjectModel(Test.name) model: Model<Test & Document>
    ) {
        super(model);
    }

}
