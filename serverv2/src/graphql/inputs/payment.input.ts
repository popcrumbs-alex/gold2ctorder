import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput {
  @Field()
  transactionId: number;
  @Field()
  updatedOrderTotal: number;
}
