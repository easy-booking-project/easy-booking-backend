import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TestDocument = Test & Document;

@Schema()
export class Test extends Document {

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    age: number;

    @Prop({ type: String, required: true })
    gender: string;

}

export const TestSchema = SchemaFactory.createForClass(Test);
