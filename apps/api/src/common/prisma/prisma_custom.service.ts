import { ApiTenantClient } from '../clients/api_tenant_client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { PrismaServiceManager } from './prisma_service_manager';
import { Injectable } from '@nestjs/common';
import { BadUserInputError } from '../exception/bad_user_input.error';
import { ERROR_MESSAGE } from '../constants/error.constants';

@Injectable()
export class PrismaCustomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly prismaServiceManager: PrismaServiceManager
  ) {}

  async getPrismaClientByTenantAlias(alias?: string): Promise<PrismaService> {
    let prisma = this.prisma;
    if (alias) {
      const app_client = new ApiTenantClient(this.configService);
      const result = await app_client.verifyTenantAlias(alias);
      if (result.errors) {
        throw new BadUserInputError(
          ERROR_MESSAGE.INVALID_CREDENTIALS,
          'tenant'
        );
      }
      prisma = this.prismaServiceManager.getClient(null, alias);
    }
    return prisma;
  }
}
