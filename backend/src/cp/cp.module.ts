import { Module } from '@nestjs/common';
import { CpService } from './cp.service';
import { CpController } from './cp.controller';

@Module({
  controllers: [CpController],
  providers: [CpService],
})
export class CpModule {}
