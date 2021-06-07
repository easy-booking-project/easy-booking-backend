import { FilterQuery, Model } from 'mongoose';
import { Document } from 'mongoose';

export abstract class RepositoryBase<T> {
  constructor(private readonly model) {}

  async find(filter: FilterQuery<T & Document>) {
    return this.model.find(filter).exec();
  }

  async insert(entity: Partial<T>) {
    const insertedDocument = new this.model(entity);
    return insertedDocument.save();
  }

  async update(filter: FilterQuery<T & Document>, entity: Partial<T>) {
    return this.model.updateMany(filter, entity as any);
  }

  async remove(filter: FilterQuery<T & Document>) {
    return this.model.remove(filter);
  }
}
