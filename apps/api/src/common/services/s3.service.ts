import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as uuid from 'uuid';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

export default class S3Service {
  constructor(
    private readonly s3client: S3Client,
    private readonly bucket: string,
    private readonly folder: string
  ) {
    const cs = new ConfigService();
    const s3Configuration: S3ClientConfig = {
      region: cs.get('AWS_REGION')
    };

    s3Configuration.credentials = fromNodeProviderChain();

    this.s3client = new S3Client(s3Configuration);
    this.bucket = cs.get('AWS_S3_IMAGES_BUCKET') as string;
    this.folder = cs.get('AWS_S3_FILES_FOLDER', 'uploads') as string;
  }

  public async getUploadUrl(imageFormat?: string): Promise<string> {
    const fileName = uuid.v4();
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: `${this.folder}/${fileName}${imageFormat ? '.' + imageFormat : ''}`
    });
    const url = await getSignedUrl(this.s3client, command, {
      expiresIn: 15 * 60
    });
    return url;
  }
}
