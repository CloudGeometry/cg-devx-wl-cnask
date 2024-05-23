import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-scalars';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  permissions: Prisma.JsonValue;
}

export enum PermissionObjectType {
  ALL = 'all',
  ITEM = 'Item',
  PERMISSION = 'Role',
  USER = 'User',
  PROFILE = 'Profile'
}

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

registerEnumType(PermissionObjectType, { name: 'PermissionObjectType' });
registerEnumType(PermissionAction, { name: 'PermissionAction' });
