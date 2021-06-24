import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class VirtualRoom extends Document {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'user' })
  owner: Types.ObjectId[] | string[]; // TODO owning by organization or group or user?

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

  @Prop({ type: Boolean, required: true })
  isPublic: boolean;

  @Prop({ type: Number, required: true })
  capacity: number;

  @Prop({ type: Boolean, required: true })
  active: boolean;
}

export const VirtualRoomSchema = SchemaFactory.createForClass(VirtualRoom);

export enum VirtualRoomType {
  MeetingRoom = ' MeetingRoom',
  ClassRoom = 'ClassRoom',
  OnlineMeeting = 'OnlineMeeting',
  Haircut = 'Haircut',
  // TODO more
}
