import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/models/user.model';
import { PrismaServiceManager } from '../common/prisma/prisma_service_manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly prismaServiceManager: PrismaServiceManager
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
      scope: Scope.REQUEST
    });
  }

  async validate(request: Request, payload: any): Promise<User> {
    const prisma = this.prismaServiceManager.getClient(request);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
