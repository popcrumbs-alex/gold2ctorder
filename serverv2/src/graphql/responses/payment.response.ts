import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaypalOrderUpdateResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  paypal_transaction_id: string;
}
