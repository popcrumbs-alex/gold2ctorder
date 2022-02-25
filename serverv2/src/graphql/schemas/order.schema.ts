import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
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

@ObjectType()
export class OrderTypeDef {
  @Field()
  _id: string;
  @Field()
  shopifyOrderId: string;
  @Field({ nullable: true })
  transactionId: string;
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
  @Field(() => [ProductType])
  products: ProductType[];
  @Field()
  state: string;
  @Field()
  zip: string;
  @Field()
  orderTotal: number;
  @Field({ nullable: true })
  paypal_transaction_id: string;
  @Field({ nullable: true })
  payapl_payment_id: string;
  @Field(() => String, { nullable: true })
  orderType: 'paypal' | 'credit';
}
