import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  strict: "throw",
  strictQuery: false,
  id: false
})

export class AdminUser {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  email: string;
  
  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, default: 'admin' })
  role?: 'admin';

}

export type AdminUserDocument =AdminUser & Document;
export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
