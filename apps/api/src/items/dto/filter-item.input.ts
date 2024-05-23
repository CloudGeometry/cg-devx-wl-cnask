import { Field, InputType } from '@nestjs/graphql';
import { ItemState } from '@prisma/client';
import { Sort } from '../../common/sorting/sort.enum';

@InputType()
export class ItemFilterInput {
  @Field(() => ItemState, { nullable: true })
  itemState?: ItemState;
}

@InputType()
export class ItemOrderByInput {
  @Field(() => Sort, { nullable: true })
  createdAt?: Sort;

  @Field(() => Sort, { nullable: true })
  title?: Sort;

  @Field(() => Sort, { nullable: true })
  itemState?: Sort;
}
