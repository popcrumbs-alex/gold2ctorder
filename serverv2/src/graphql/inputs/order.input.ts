import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field()
  sku: string;
  @Field()
  price: number;
  @Field()
  title: string;
  @Field()
  type: string;
  @Field()
  displayPrice: string;
  @Field()
  id: number;
  @Field()
  isRecurring: boolean;
}

@InputType()
export class CreateOrderInput {
  @Field()
  creditCardNumber: number;
  @Field()
  expiry: string;
  @Field()
  cvc: number;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  state: string;
  @Field()
  zip: string;
  @Field()
  orderTotal: number;
  @Field(() => [ProductInput])
  products: ProductInput[];
}

@InputType()
export class UpdateOrderInput {
  @Field()
  shopifyOrderId: string;
  @Field()
  paymentTransactionId: number;
  @Field(() => ProductInput)
  product: ProductInput;
  @Field()
  updatedOrderTotal: number;
  @Field()
  orderId: string;
}
