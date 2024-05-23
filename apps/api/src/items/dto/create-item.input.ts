import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  dueDate: Date;

  @Field({ nullable: true })
  assigneeId?: string;
}
