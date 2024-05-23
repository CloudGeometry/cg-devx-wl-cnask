import { Prisma } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { LoginInput } from './dto/login.input';
import { Token } from './models/token.model';
import { SecurityConfig } from '../common/configs/config.interface';
import { CreateUserInput } from './dto/create.user.input';
import { ERROR_MESSAGE } from '../common/constants/error.constants';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { User } from '../user/models/user.model';
import { PrismaService } from '../common/prisma/prisma.service';
import { PrismaServiceManager } from '../common/prisma/prisma_service_manager';
import { PrismaCustomService } from '../common/prisma/prisma_custom.service';

class JwtPayload {
  userId: string;
  permissions: object;
  alias?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly prismaServiceManager: PrismaServiceManager,
    private readonly prismaCustomService: PrismaCustomService
  ) {}

  public generateTokens(payload: JwtPayload): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  async login(input: LoginInput): Promise<Token> {
    const prisma = await this.prismaCustomService.getPrismaClientByTenantAlias(
      input.tenantAlias
    );

    const user = await prisma.user.findUnique({
      where: { username: input.username },
      include: { role: true }
    });

    if (!user) {
      throw new BadUserInputError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        'username'
      );
    }

    const passwordValid = await this.passwordService.validatePassword(
      input.password,
      user.password
    );

    if (!passwordValid) {
      throw new BadUserInputError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        'username'
      );
    }

    return this.generateTokens({
      userId: user.id,
      permissions: user.role.permissions as object,
      alias: input.tenantAlias
    });
  }

  async createUser(payload: CreateUserInput): Promise<Token> {
    const prisma = this.prismaServiceManager.getClient(
      null,
      payload.tenantAlias
    );
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );
    let email = payload.email;
    if (payload.inviteId) {
      try {
        const invite = await prisma.invite.update({
          data: { activate: true },
          where: { id: payload.inviteId }
        });
        email = invite.email;
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2002'
        ) {
          throw new BadUserInputError(
            `Can't find invite id ${payload.inviteId}`,
            'inviteId'
          );
        }
        throw new Error(e);
      }
    }
    try {
      const user = await prisma.user.create({
        include: { role: true },
        data: {
          username: payload.username,
          roleId:
            payload.role ||
            (await prisma.role
              .findFirst({ where: { name: 'USER' } })
              .then((role) => role.id)),
          password: hashedPassword,
          profile: {
            create: {
              firstname: payload.firstname,
              lastname: payload.lastname,
              email,
              locale: payload.locale
            }
          }
        }
      });
      return this.generateTokens({
        userId: user.id,
        permissions: user.role.permissions as object,
        alias: payload.tenantAlias
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadUserInputError(
          `Email ${payload.email} already used.`,
          'email'
        );
      }
      throw new Error(e);
    }
  }

  async getUserFromToken(token: string): Promise<User> {
    const decodedToken = this.jwtService.decode(token);
    const prisma = this.prismaServiceManager.getClient(
      null,
      decodedToken['alias']
    );
    return await prisma.user.findUnique({
      where: { id: decodedToken['userId'] }
    });
  }

  private generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: JwtPayload): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn
    });
  }

  refreshToken(token: string) {
    try {
      const { userId, permissions, alias } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET')
      });

      return this.generateTokens({
        userId,
        permissions,
        alias
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
