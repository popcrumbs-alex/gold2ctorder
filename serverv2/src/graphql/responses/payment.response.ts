import { Field, ObjectType } from '@nestjs/graphql';
import { PaypalProduct } from '../schemas/paypal.schema';

@ObjectType()
export class PaypalOrderUpdateResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  paypal_transaction_id: string;
}

@ObjectType()
export class CreatePaypalSubscriptionPlanResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  //TODO change this once it is created
  @Field(() => PaypalProduct)
  subscriptionPlan: PaypalProduct;
}

@ObjectType()
export class CreatePaypalProductResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => PaypalProduct)
  product: PaypalProduct;
}

@ObjectType()
export class GetPaypalProductResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => PaypalProduct)
  product: PaypalProduct;
}
