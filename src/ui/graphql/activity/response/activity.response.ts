import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActivityResponse {
  @Field()
  activity: string;

  @Field()
  type: string;

  @Field()
  price: number;
}
