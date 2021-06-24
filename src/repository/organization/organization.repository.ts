import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { Organization } from './organization.schema';

@Injectable()
export class OrganizationRepository extends RepositoryBase<Organization> {
  constructor(
    @InjectModel(Organization.name) model: Model<Organization & Document>,
  ) {
    super(model);
  }
}
