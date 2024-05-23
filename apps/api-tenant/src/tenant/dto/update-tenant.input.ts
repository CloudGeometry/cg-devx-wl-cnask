import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Prisma, TenantStatus } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-scalars';

registerEnumType(TenantStatus, { name: 'TenantStatus' });

@InputType()
export class UpdateTenantInput {
  @Field(() => TenantStatus, { defaultValue: TenantStatus.NEW })
  status?: TenantStatus;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  config?: Prisma.JsonValue | null;

  @Field(() => String, { nullable: true })
  owner?: string | null;
}
