import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
  products: Product[];
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
