import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LiveController } from './live.controller';
import { ReadyController } from './ready.controller';

@Module({
  imports: [TerminusModule],
  providers: [PrismaService],
  controllers: [HealthController, LiveController, ReadyController]
})
export class HealthModule {}
