import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum CycleFrame {
  YEAR = 'Year',
  MONTH = 'Month',
  WEEK = 'Week',
  DAY = 'Day',
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

  @Prop({ type: Date, required: true })
  cycleStartDate: Date;

  @Prop({ type: Date, required: true })
  cycleEndDate: Date;

  @Prop({ type: CycleFrame, required: true })
  cycleFrame: CycleFrame;

  @Prop({ type: Object, required: true })
  repeatOn: any; // TODO different repeat condition depends on cycle frame (monthly/ weekly/ yearly)

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  participants: Types.ObjectId[] | string[];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
