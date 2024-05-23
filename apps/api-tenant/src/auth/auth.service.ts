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
import { PrismaService } from 'nestjs-prisma';

class JwtPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  public generateTokens(payload: JwtPayload): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  async login(input: LoginInput): Promise<Token> {
    const user = await this.prisma.user.findUnique({
      where: { username: input.username }
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
      userId: user.id
    });
  }

  async createUser(payload: CreateUserInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          username: payload.username,
          password: hashedPassword
        }
      });

      return this.generateTokens({
        userId: user.id
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
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
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET')
      });

      return this.generateTokens({
        userId
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
