import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { minioConfig } from './config';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: minioConfig.MINIO_ENDPOINT,
      port: minioConfig.MINIO_PORT,
      accessKey: minioConfig.MINIO_ACCESSKEY,
      secretKey: minioConfig.MINIO_SECRET_KEY,
      useSSL: false,
    });
  }

  async uploadFile(bucket, objectName, fileBuffer: Buffer) {
    const exists = await this.minioClient.bucketExists(bucket);
    if (!exists) {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
    }
    return this.minioClient.putObject(bucket, objectName, fileBuffer);
  }

  getPublicUrl(bucket, objectName) {
    return `http://localhost:9000/${bucket}/${objectName}`;
  }
}
