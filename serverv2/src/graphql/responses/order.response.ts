import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/mongo/schemas/order.model';
import { OrderTypeDef } from '../schemas/order.schema';

@ObjectType()
export class OrderResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OrderTypeDef, { nullable: true })
  Order: Order;
}

@ObjectType()
export class PendingOrdersResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [OrderTypeDef])
  Orders: Order[];
}

@ObjectType()
export class TestProduct {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  descriptionHtml: string;
}

@ObjectType()
export class TestResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [TestProduct])
  products: Array<TestProduct>;
}

@ObjectType()
export class StickyAuthResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field({ nullable: true })
  auth: string;
}

@ObjectType()
export class CreateStickyIOOrderResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OrderTypeDef, { nullable: true })
  Order: Order;
}
