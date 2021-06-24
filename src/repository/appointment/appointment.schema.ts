import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'user' })
  createdBy: Types.ObjectId | string;

  @Prop({ type: Date, required: true })
  createdOn: string;

  @Prop({ type: Date, required: true })
  fromTime: string;

  @Prop({ type: Date, required: true })
  toTime: string;

  @Prop({ type: Boolean, required: true })
  repeat: boolean; // TODO Repeat Definition

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  participants: Types.ObjectId[] | string[];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
