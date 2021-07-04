import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  admins: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  members: Types.ObjectId[] | string[];

  @Prop({ type: Boolean, required: true })
  active: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
