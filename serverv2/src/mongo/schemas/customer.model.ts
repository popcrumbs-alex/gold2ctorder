import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order } from './order.model';

@Schema()
export class Customer {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop(
    raw([{ order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } }]),
  )
  orders: Order[];
}

export type CustomerDocument = Customer & Document;

export const CustomerSchema = SchemaFactory.createForClass(Customer);
