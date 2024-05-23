import { BaseModel } from '../../common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { ItemState } from '@prisma/client';
import Paginated from '../../common/pagination/paginator';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Item extends BaseModel {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field()
  dueDate?: Date;

  @Field(() => ItemState, { defaultValue: ItemState.TODO })
  itemState: ItemState;

  @Field(() => User, { nullable: true })
  assignee?: User | null;
}

@ObjectType()
export class PaginatedItems extends Paginated<Item>(Item) {}
