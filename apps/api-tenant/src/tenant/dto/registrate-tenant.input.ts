import { IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegistrateTenantInput {
  @Field(() => String)
  alias: string;

  @IsEmail()
  @Field(() => String)
  email: string;
}
