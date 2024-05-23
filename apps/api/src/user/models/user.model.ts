import 'reflect-metadata';
import { ObjectType, HideField, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.model';
import { Item } from '../../items/models/item.model';
import { Role } from '../../role/models/role.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  username: string;

  @HideField()
  password: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => [Item], { nullable: true })
  items?: [Item] | null;
}
