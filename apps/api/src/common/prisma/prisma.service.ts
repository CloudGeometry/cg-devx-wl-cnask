import {
  FactoryProvider,
  INestApplication,
  Injectable,
  OnModuleInit,
  Scope
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaServiceManager } from './prisma_service_manager';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

export const prismaServiceProvider: FactoryProvider<PrismaService> = {
  provide: PrismaService,
  scope: Scope.REQUEST,
  inject: [REQUEST, PrismaServiceManager],
  useFactory: (request, manager) => {
    return manager.getClient(request);
  }
};
