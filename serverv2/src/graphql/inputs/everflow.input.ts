import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EverflowOrderTrackInput {
  @Field()
  aff_id: string;
  @Field()
  amount: number;
}
