import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { minioConfig } from './config';

@Controller('files')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const bucket = minioConfig.MINIO_BUCKET_NAME;
    const objectName = `${Date.now()}-${file.originalname}`;

    await this.minioService.uploadFile(bucket, objectName, file.buffer, file.mimetype,);

    return {
      message: 'Uploaded successfully',
      url: this.minioService.getPublicUrl(bucket, objectName),
    };
  }
}
