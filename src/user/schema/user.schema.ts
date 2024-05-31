import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, } from 'mongoose'

@Schema({
  timestamps: true,
  strict: "throw",
  strictQuery: false,
  id: false
})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true  })
  lastname: string;

  @Prop({ required: true  })
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);