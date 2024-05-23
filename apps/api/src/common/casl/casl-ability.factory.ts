import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  MatchConditions,
  PureAbility
} from '@casl/ability';
import { Prisma } from '@prisma/client';
import {
  PermissionAction,
  PermissionObjectType,
  Role
} from '../../role/models/role.model';
import { User } from '../../user/models/user.model';
import { PermissionUtils } from './casl.utils';
import { PrismaService } from '../prisma/prisma.service';

export type AppAbility = PureAbility<
  [PermissionAction, PermissionObjectType],
  MatchConditions
>;
const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions;

export interface Permission {
  action?: PermissionAction;
  subject?: PermissionObjectType;
  conditions?: object;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly prisma: PrismaService) {}

  async createForUser(user: User): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>
    );
    const dbPermissions: Role = await this.prisma.user
      .findUnique({ where: { id: user.id } })
      .role();
    for (const permission of (dbPermissions?.permissions ??
      []) as Prisma.JsonArray) {
      const p = permission as Permission;
      const conditions = PermissionUtils.parseCondition(p.conditions, {
        userId: user.id
      });
      can(p.action, p.subject, conditions as MatchConditions);
    }
    return build({ conditionsMatcher: lambdaMatcher });
  }
}
