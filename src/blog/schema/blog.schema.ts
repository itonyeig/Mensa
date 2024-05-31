import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, } from 'mongoose'
import { User } from 'src/user/schema/user.schema';

@Schema({
  timestamps: true,
  strict: "throw",
  strictQuery: false,
  id: false
})

export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true  })
  content: string;

  @Prop({ required: true, ref: User.name, immutable: true  })
  arthur: Types.ObjectId;
}

export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);