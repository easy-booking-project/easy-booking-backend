import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Slot extends Document {
  @Prop({ type: Date, required: true })
  fromTime: string;

  @Prop({ type: Date, required: true })
  toTime: string;

  @Prop({ type: Boolean, required: true })
  repeat: boolean; // TODO Repeat Definition

  @Prop({ type: String })
  description: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Slot);
