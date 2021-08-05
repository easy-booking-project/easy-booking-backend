import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../role/role.schema';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  authenticationHash: string;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'role' })
  roleIds: Types.ObjectId[] | string[];

  @Prop({ type: String })
  nickname?: string;

  @Prop({ type: String })
  firstName?: string;

  @Prop({ type: String })
  middleName?: string;

  @Prop({ type: String })
  lastName?: string;

  @Prop({ type: String })
  token?: string;
}

export type UserEntity = {
  id: string;
  username: string;
  nickname: string;
  firstName: string;
  middleName: string;
  lastName: string;
  roles: Role[];
};

export const UserSchema = SchemaFactory.createForClass(User);
