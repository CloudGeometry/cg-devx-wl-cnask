import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';
import * as aws from '@aws-sdk/client-ses';

@Injectable()
export default class SesEmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    const credentials = fromNodeProviderChain();
    const transporter = new SES({
      apiVersion: '2010-12-01',
      region: configService.get('AWS_REGION'),
      credentials: credentials
    });

    this.nodemailerTransport = createTransport({
      SES: { ses: transporter, aws: aws }
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
