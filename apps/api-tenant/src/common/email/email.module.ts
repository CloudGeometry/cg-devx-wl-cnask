import { Module } from '@nestjs/common';
import GmailEmailService from './gmail.email.service';
import { ConfigModule } from '@nestjs/config';
import SesEmailService from './ses.email.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [GmailEmailService, SesEmailService],
  exports: [GmailEmailService, SesEmailService]
})
export class EmailModule {}
