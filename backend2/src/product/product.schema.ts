import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: 'General' })
  category: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);