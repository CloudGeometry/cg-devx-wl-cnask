import { Module } from '@nestjs/common';
import S3Service from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [S3Client, ConfigModule],
  controllers: [],
  providers: [S3Service],
  exports: [S3Service]
})
export class ServicesModule {}
