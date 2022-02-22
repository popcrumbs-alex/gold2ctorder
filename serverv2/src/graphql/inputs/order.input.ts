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
  @Field({ nullable: true })
  creditCardNumber: string;
  @Field({ nullable: true })
  expiry: string;
  @Field({ nullable: true })
  cvc: string;
  @Field(() => String)
  orderType: 'paypal' | 'credit';
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
  @Field({ nullable: true })
  ef_aff_id: string;
  @Field({ nullable: true })
  paypal_transaction_id: string | undefined;
  @Field({ nullable: true })
  paypal_payer_id: string;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => ProductInput)
  product: ProductInput;
  @Field()
  orderId: string;
}

@InputType()
export class FindOrderInput {
  @Field()
  id: string;
}

@InputType()
export class CloseOrderInput {
  @Field()
  orderId: string;
}
