import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaypalProduct {
  @Field({ nullable: true })
  id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  category: string;
  @Field({ nullable: true })
  image_url: string;
  @Field({ nullable: true })
  home_url: string;
  @Field({ nullable: true })
  create_time: string;
  @Field({ nullable: true })
  update_time: string;
  @Field(() => [String], { nullable: true })
  links: Array<string>;
}
