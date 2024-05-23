import 'reflect-metadata';
import { ObjectType, HideField, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @HideField()
  password: string;
}
