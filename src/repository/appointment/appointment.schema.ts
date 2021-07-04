import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum CycleFrame {
  MONTH = 'Month',
  WEEK = 'Week',
  DAY = 'Day',
}

export class Repeat {
  cycleStartDate: Date;
  cycleEndDate: Date;
  cycleFrame: CycleFrame;
}

@Schema()
export class Appointment extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'user' })
  createdBy: Types.ObjectId | string;

  @Prop({ type: Date, required: true })
  createdOn: Date;

  // TODO use mongoose dateTime
  // TODO use javascript time-zone
  @Prop({ type: Date, required: true })
  fromTime: Date;

  @Prop({ type: Date, required: true })
  toTime: Date;

  @Prop({ type: Repeat, required: true })
  repeat: Repeat;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  participants: Types.ObjectId[] | string[];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
