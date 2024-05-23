import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Profile {
  @Field()
  email: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  locale?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  photo?: string | null;
}
