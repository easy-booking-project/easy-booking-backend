import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository.base';
import { Document, Model } from 'mongoose';
import { Appointment } from './appointment.schema';

@Injectable()
export class AppointmentRepository extends RepositoryBase<Appointment> {
  constructor(
    @InjectModel(Appointment.name) model: Model<Appointment & Document>,
  ) {
    super(model);
  }
}
