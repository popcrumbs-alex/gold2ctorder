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
