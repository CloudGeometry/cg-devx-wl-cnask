import { Module } from '@nestjs/common';
import { TenantResolver } from './tenant.resolver';
import { TenantService } from './tenant.service';
import SesEmailService from '../common/email/ses.email.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [TenantResolver, TenantService, SesEmailService, JwtService]
})
export class TenantModule {}
