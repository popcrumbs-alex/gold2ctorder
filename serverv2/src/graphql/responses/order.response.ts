import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/mongo/schemas/order.model';
import { OrderTypeDef } from '../schemas/order.schema';

@ObjectType()
export class OrderResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OrderTypeDef)
  Order: Order;
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
