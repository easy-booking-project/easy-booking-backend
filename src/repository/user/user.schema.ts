import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true })
    authenticationHash: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'role' })
    roleId: Types.ObjectId | string;

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

export const UserSchema = SchemaFactory.createForClass(User);