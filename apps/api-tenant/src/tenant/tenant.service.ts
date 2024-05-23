import { BadRequestException, Injectable } from '@nestjs/common';
import { Tenant } from './models/tenant.model';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { safeDelete, safeWhere } from '../common/utils/safe.filter';
import { TenantStatus } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import SesEmailService from '../common/email/ses.email.service';
import VerificationTokenPayload from './dto/verification-token.interface';
import { RegistrateTenantInput } from './dto/registrate-tenant.input';
import { ApiAppClient } from '../common/clients/api_app_client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TenantService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: SesEmailService
  ) {}

  async getTenants(): Promise<Tenant[]> {
    return await this.prisma.tenant.findMany({
      where: safeWhere({})
    });
  }

  async tenant(id: string): Promise<Tenant> {
    return await this.prisma.tenant.findFirst({
      where: { id }
    });
  }

  async tenantByAlias(alias: string): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findFirst({
      where: { alias }
    });

    if (!tenant) {
      throw new BadUserInputError(
        `No tenant found for alias: ${alias}`,
        'alias'
      );
    }

    return tenant;
  }

  async sendVerificationLink(email: string): Promise<string> {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'
      )}s`
    });
    const url = `${this.configService.get(
      'TENANT_REG_CONFIRMATION_URL'
    )}?token=${token}`;
    const text = `Welcome to the application. Please verify an email: ${url}`;
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

  async registrateTenant(data: RegistrateTenantInput): Promise<Tenant> {
    const { alias, email } = data;
    let tenant = await this.prisma.tenant.findFirst({
      where: { alias }
    });
    if (tenant) {
      throw new BadUserInputError('Alias is not unique', 'alias');
    }
    tenant = await this.prisma.tenant.findFirst({
      where: { email }
    });
    if (tenant) {
      throw new BadUserInputError('Email is not unique', 'email');
    }
    const verificationLink = await this.sendVerificationLink(email);
    return await this.prisma.tenant.create({
      data: {
        alias,
        email,
        verificationLink
      }
    });
  }

  async decodeSingUpToken(token: string): Promise<Tenant> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET')
      });

      if (typeof payload === 'object' && 'email' in payload) {
        const tenant = await this.prisma.tenant.update({
          data: { status: TenantStatus.VERIFIED },
          where: { email: payload.email }
        });
        if (!tenant) {
          throw new BadUserInputError('Cant find a tenant', 'email');
        }
        return tenant;
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

  public async bootstrapTenant(id: string): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findFirst({
      where: safeWhere({
        id,
        status: TenantStatus.VERIFIED
      })
    });
    if (tenant) {
      const app_client = new ApiAppClient(tenant, this.configService);
      const result = await app_client.bootstrapTenant();
      if (!result.errors) {
        return await this.prisma.tenant.update({
          data: { status: TenantStatus.CREATED },
          where: { id }
        });
      }
      throw new BadUserInputError(String(result.errors), 'tenant');
    }
    throw new BadUserInputError(`No verified tenant found for id: ${id}`, 'id');
  }

  async updateTenant(
    userId: string,
    id: string,
    data: UpdateTenantInput
  ): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findFirst({
      where: { id }
    });

    if (!tenant) {
      throw new BadUserInputError(`No tenant found for id: ${id}`, 'id');
    }

    return await this.prisma.tenant.update({
      data: {
        ...data,
        updatedById: userId,
        updatedAt: new Date()
      },
      where: { id }
    });
  }

  async deleteTenant(id: string): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findFirst({
      where: { id }
    });

    if (!tenant) {
      throw new BadUserInputError(`No tenant found for id: ${id}`, 'id');
    }
    return await safeDelete<Tenant>(this.prisma, 'tenant', id);
  }
}
