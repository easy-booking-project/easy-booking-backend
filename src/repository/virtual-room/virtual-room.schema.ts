import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class VirtualRoom extends Document {
  // TODO make a reference table for type
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  owners: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'slot' })
  slots: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'appointment' })
  appointments: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'group' })
  visibleToGroup: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  visibleToUser: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'group' })
  validToGroup: Types.ObjectId[] | string[];

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  validToUser: Types.ObjectId[] | string[];

  @Prop({ type: Number, required: true })
  capacity: number;

  // TODO change to enum type
  @Prop({ type: String, required: true })
  status: string;
}

export const VirtualRoomSchema = SchemaFactory.createForClass(VirtualRoom);

export enum VirtualRoomType {
  MEETING_ROOM = 'Meeting Room',
  CLASS_ROOM = 'Class Room',
  VIRTUAL = 'Virtual',
  // TODO more
}

export enum VirtualRoomStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  MAINTENANCE = 'Maintenance',
}
