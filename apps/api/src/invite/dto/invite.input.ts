import 'reflect-metadata';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class InviteInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  tenantAlias?: string;
}
