import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { prismaServiceProvider } from '../prisma/prisma.service';
import { LiveController } from './live.controller';
import { ReadyController } from './ready.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TerminusModule, PrismaModule],
  providers: [prismaServiceProvider],
  controllers: [HealthController, LiveController, ReadyController]
})
export class HealthModule {}
