import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission
} from './permission.decorator';
import { PrismaServiceManager } from '../prisma/prisma_service_manager';
import { ConfigService } from '@nestjs/config';
import { config } from '../configs/config';

export const Conditions = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<object> => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const reflector = new Reflector();
    const configService = new ConfigService(config);
    const prismaServiceManager = new PrismaServiceManager(configService, null);
    const prisma = prismaServiceManager.getClient(request);
    const abilityFactory = new CaslAbilityFactory(prisma);
    const requiredPermissions =
      reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler()
      ) || [];
    const user = request?.user;
    const ability = await abilityFactory.createForUser(user);
    return (
      ability.relevantRuleFor(
        requiredPermissions[0][0],
        requiredPermissions[0][1]
      )?.conditions || {}
    );
  }
);
