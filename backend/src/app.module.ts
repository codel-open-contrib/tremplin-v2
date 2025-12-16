import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpModule } from './cp/cp.module';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CpModule,
    MinioModule,
  ],
})
export class AppModule {}
