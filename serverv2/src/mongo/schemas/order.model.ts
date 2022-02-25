import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export interface Product {
  sku: string;
  price: number;
  title: string;
  type: string;
  displayPrice: string;
  id: number;
  isRecurring: boolean;
}

@Schema()
export class Order {
  @Prop({ type: String, default: 'pending' })
  status: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zip: string;
  @Prop()
  orderTotal: number;
  @Prop()
  transactionId: string;
  @Prop()
  shopifyOrderId: string;
  @Prop({ type: mongoose.Schema.Types.Date })
  orderStartTime: mongoose.Schema.Types.Date;
  @Prop()
  products: Product[];
  @Prop()
  ef_aff_id: string;
  @Prop({ default: 'not-a-paypal-order' })
  paypal_transaction_id: string;
  @Prop()
  orderType: string;
  @Prop({ default: 'not-a-paypal-payment' })
  paypal_payment_id: string;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
