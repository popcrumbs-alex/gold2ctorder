import { Field, InputType } from '@nestjs/graphql';
import { ProductInput } from './order.input';

@InputType()
export class UpdateShopifyOrderInput {
  @Field(() => [ProductInput])
  products: ProductInput[];
  @Field()
  order_id: string;
}
