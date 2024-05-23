import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { SecurityConfig } from '../common/configs/config.interface';
import { ScriptModule } from '../common/scripts/script.module';
import { prismaServiceProvider } from 'common/prisma/prisma.service';
import { InviteService } from '../invite/invite.service';
import SesEmailService from '../common/email/ses.email.service';
import { ApiTenantClient } from 'common/clients/api_tenant_client';
import { TenantService } from './tenant.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: false,
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn
          }
        };
      },
      inject: [ConfigService]
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ScriptModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    PasswordService,
    InviteService,
    SesEmailService,
    JwtModule,
    ApiTenantClient,
    TenantService,
    prismaServiceProvider
  ],
  exports: [JwtModule]
})
export class AuthModule {}
