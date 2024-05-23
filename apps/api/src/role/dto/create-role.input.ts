import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  name: string;

  @Field(() => [GraphQLJSONObject])
  permissions: Prisma.JsonValue;
}
