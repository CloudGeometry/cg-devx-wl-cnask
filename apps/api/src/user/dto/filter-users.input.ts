import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserFilterInput {
  @Field(() => String, { nullable: true })
  userFirstLastName?: string;
}
