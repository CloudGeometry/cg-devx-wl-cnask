import {
  Field,
  InputType,
  PartialType,
  registerEnumType
} from '@nestjs/graphql';
import { CreateItemInput } from './create-item.input';
import { ItemState } from '@prisma/client';

registerEnumType(ItemState, { name: 'ItemState' });

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ItemState, { nullable: true })
  itemState?: ItemState;
}
