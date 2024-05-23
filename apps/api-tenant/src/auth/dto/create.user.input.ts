import { Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { UserDoesNotExist } from '../validation/user-does-not-exist.constraint';

@InputType('UserAddInput')
export class CreateUserInput {
  @Length(5)
  @UserDoesNotExist()
  @Field()
  username: string;

  @Length(8)
  @Field()
  password: string;
}
