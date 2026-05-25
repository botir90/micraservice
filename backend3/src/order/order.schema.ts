import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderItem = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Array, default: [] })
  items: OrderItem[];

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);