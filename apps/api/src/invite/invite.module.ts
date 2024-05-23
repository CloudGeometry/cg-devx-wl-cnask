import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import SesEmailService from '../common/email/ses.email.service';
import { JwtService } from '@nestjs/jwt';
import { InviteResolver } from './invite.resolver';
import { prismaServiceProvider } from '../common/prisma/prisma.service';

@Module({
  imports: [],
  providers: [
    InviteResolver,
    InviteService,
    SesEmailService,
    JwtService,
    prismaServiceProvider
  ]
})
export class InviteModule {}
