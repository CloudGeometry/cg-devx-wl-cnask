import { BaseModel } from '../../common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prisma, TenantStatus } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-scalars';

@ObjectType()
export class Tenant extends BaseModel {
  @Field(() => String)
  alias: string;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  config?: Prisma.JsonValue | null;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  verificationLink: string;

  @Field(() => TenantStatus)
  status: TenantStatus;

  @Field(() => String, { nullable: true })
  owner: string;
}
