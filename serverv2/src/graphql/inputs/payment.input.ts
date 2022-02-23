import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput {
  @Field()
  transactionId: number;
  @Field()
  updatedOrderTotal: number;
}

@InputType()
export class UpdatePaypalOrderInput {
  @Field()
  paypal_order_id: string;
  @Field()
  itemAmount: number;
}

@InputType()
export class CreatePaypalProductInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field()
  type: string;
  @Field({ nullable: true })
  category: string;
  @Field({ nullable: true })
  image_url: string;
  @Field({ nullable: true })
  home_url: string;
}

@InputType()
export class GetPaypalProductInput {
  @Field()
  productId: string;
}

@InputType()
export class AddSubscriptionInput {
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
  paypal_payer_id: string;
}

@InputType()
export class RefundCreditTransactionInput {
  @Field()
  transactionId: string;
  @Field()
  amount: number;
}
