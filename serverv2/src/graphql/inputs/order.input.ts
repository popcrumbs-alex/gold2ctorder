import { Field, InputType } from '@nestjs/graphql';

//this is formatted the same way as the stickyio call is formatted
@InputType()
export class PossibleVariant {
  @Field()
  attribute_name: string;
  @Field()
  attribute_value: string;
}

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
  @Field()
  sticky_offer_id: number;
  @Field()
  sticky_product_id: number;
  @Field()
  sticky_billing_model_id: number;
  @Field()
  sticky_quantity: number;
  @Field({ nullable: true })
  sticky_trial_product_id: number;
  @Field(() => PossibleVariant, { nullable: true })
  sticky_variant_object: PossibleVariant;
  @Field({ nullable: true })
  sticky_next_recurring_product_id: number;
}

@InputType()
export class CreateOrderInput {
  @Field()
  creditCardType: string;
  @Field({ nullable: true })
  creditCardNumber: string;
  @Field({ nullable: true })
  expiry: string;
  @Field({ nullable: true })
  cvc: string;
  @Field(() => String)
  orderType: 'paypal' | 'credit';
  @Field()
  sticky_shipping_id: number;
  @Field()
  sticky_campaign_id: number;
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
  @Field({ nullable: true })
  paypal_payment_id: string | undefined;
  @Field({ nullable: true })
  funnel_name: string;
  @Field({ nullable: true })
  affiliate_data: string;
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
