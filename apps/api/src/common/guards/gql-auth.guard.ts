import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from '../casl/casl-ability.factory';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission
} from '../decorators/permission.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PrismaServiceManager } from '../prisma/prisma_service_manager';
import { config } from '../configs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);
    const alias = this.jwtService.decode(token)['alias'];

    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler()
      ) || [];
    const user = request?.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const configService = new ConfigService(config);
    const prismaServiceManager = new PrismaServiceManager(configService, null);
    const prisma = prismaServiceManager.getClient(request, alias);
    const abilityFactory = new CaslAbilityFactory(prisma);
    const ability = await abilityFactory.createForUser(user);
    return requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission)
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers) {
      return undefined;
    }
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isAllowed(
    ability: AppAbility,
    permission: RequiredPermission
  ): boolean {
    return ability.can(...permission);
  }
}
