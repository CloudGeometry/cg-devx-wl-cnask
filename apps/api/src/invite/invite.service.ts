import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import VerificationTokenPayload from './dto/verification-token.interface';
import { Invite } from './models/invite.model';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { PrismaService } from '../common/prisma/prisma.service';
import SesEmailService from '../common/email/ses.email.service';
import { PrismaServiceManager } from '../common/prisma/prisma_service_manager';
import { PrismaCustomService } from '../common/prisma/prisma_custom.service';

@Injectable()
export class InviteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: SesEmailService,
    private readonly prismaServiceManager: PrismaServiceManager,
    private readonly prismaCustomService: PrismaCustomService
  ) {}

  public async invites(): Promise<Invite[]> {
    return await this.prisma.invite.findMany({
      where: { activate: false }
    });
  }

  public async invite(id: string): Promise<Invite> {
    return await this.prisma.invite.findUnique({
      where: { id }
    });
  }

  public async delete(id: string): Promise<Invite> {
    return await this.prisma.invite.delete({
      where: { id }
    });
  }

  public async addAdminInvite(
    email: string,
    url: string,
    alias?: string
  ): Promise<Invite> {
    const prisma = await this.prismaCustomService.getPrismaClientByTenantAlias(
      alias
    );
    const roleAdmin = await prisma.role.findUnique({
      where: { name: 'ADMIN' }
    });
    return await prisma.invite.create({
      data: {
        email,
        link: url,
        roleId: roleAdmin.id
      }
    });
  }

  public async addInvite(
    email: string,
    url: string,
    userId: string
  ): Promise<Invite> {
    return await this.prisma.invite.create({
      data: {
        email,
        link: url,
        createdById: userId
      }
    });
  }

  public async sendVerificationLink(
    email: string,
    alias?: string
  ): Promise<string> {
    const payload: VerificationTokenPayload = { email, alias };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'
      )}s`
    });
    const url = `${this.configService.get(
      'INVITATION_CONFIRMATION_URL'
    )}?token=${token}`;

    const text = `Welcome to the application. To sing up, click here: ${url}`;
    try {
      await this.emailService.sendMail({
        from: this.configService.get('EMAIL_SENDER'),
        to: email,
        subject: 'Email confirmation',
        text
      });
    } catch (e) {
      console.error(`Email hasn't sent. Check the configuration.`, e);
    }
    return url;
  }

  public async sendConfirmationLink(
    email: string,
    alias?: string
  ): Promise<string> {
    const prisma = await this.prismaCustomService.getPrismaClientByTenantAlias(
      alias
    );
    const invite = await prisma.invite.findUnique({
      where: { email }
    });
    if (invite) {
      throw new BadUserInputError('Email is not unique', 'email');
    }
    const profile = await prisma.profile.findUnique({
      where: { email }
    });
    if (profile) {
      throw new BadUserInputError('User already activate', 'email');
    }
    return await this.sendVerificationLink(email, alias);
  }

  public async resendConfirmationLink(id: string): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      where: { id }
    });
    if (!invite) {
      throw new BadUserInputError('Cant find an invite', 'id');
    }
    const url = await this.sendVerificationLink(invite.email);
    return await this.prisma.invite.update({
      data: { link: url },
      where: { id }
    });
  }

  public async decodeSingUpToken(token: string): Promise<Invite> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET')
      });

      let prisma = this.prisma;
      if (typeof payload === 'object' && 'email' in payload) {
        if ('alias' in payload) {
          prisma = this.prismaServiceManager.getClient(null, payload.alias);
        }
        const invite = await prisma.invite.findUnique({
          where: { email: payload.email }
        });
        if (!invite) {
          throw new BadUserInputError('Cant find an invite', 'id');
        }
        return invite;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadUserInputError(
          'Email confirmation token expired',
          'token'
        );
      }
      throw new BadUserInputError('Bad confirmation token', 'token');
    }
  }
}
