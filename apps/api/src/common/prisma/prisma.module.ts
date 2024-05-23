import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaServiceManager } from './prisma_service_manager';
import { PrismaCustomService } from './prisma_custom.service';

@Global()
@Module({
  providers: [PrismaService, PrismaServiceManager, PrismaCustomService],
  exports: [PrismaService, PrismaServiceManager, PrismaCustomService]
})
export class PrismaModule {}
