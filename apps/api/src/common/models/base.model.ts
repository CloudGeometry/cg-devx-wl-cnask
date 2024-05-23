import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

export enum BaseState {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt?: Date;
  @Field()
  updatedAt?: Date;
  @Field(() => String, { defaultValue: BaseState.ACTIVE })
  baseState: string;
  @Field(() => User, { nullable: true })
  createdBy?: User;
  @Field(() => User, { nullable: true })
  updatedBy?: User;
}
