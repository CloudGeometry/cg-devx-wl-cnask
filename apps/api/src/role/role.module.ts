import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { prismaServiceProvider } from '../common/prisma/prisma.service';

@Module({
  imports: [],
  providers: [RoleResolver, RoleService, prismaServiceProvider]
})
export class RoleModule {}
