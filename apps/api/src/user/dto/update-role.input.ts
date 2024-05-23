import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => String)
  roleId: string;
}
