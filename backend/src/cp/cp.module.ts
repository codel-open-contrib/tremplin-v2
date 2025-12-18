import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpService } from './cp.service';
import { CpController } from './cp.controller';
import { Cp } from './cp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cp])],
  controllers: [CpController],
  providers: [CpService],
})
export class CpModule {}
