import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EverflowOrderTrackResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
}
