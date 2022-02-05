import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/mongo/schemas/order.model';
import { OrderTypeDef } from '../schemas/order.schema';

@ObjectType()
export class CreateOrderResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OrderTypeDef)
  Order: Order;
}

@ObjectType()
export class UpdateOrderResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OrderTypeDef)
  Order: Order;
}
