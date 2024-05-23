import 'reflect-metadata';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLURL } from 'graphql-scalars';

@ObjectType()
export class Invite {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  createdById: string;

  @Field(() => Boolean, { defaultValue: false })
  activate: boolean;

  @Field(() => GraphQLURL)
  link: string;

  @Field({ nullable: true })
  aliasTenant?: string;
}
