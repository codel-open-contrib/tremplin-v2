import { Module } from '@nestjs/common';
import { ModuleCoursService } from './module.service';
import { ModuleCoursController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleCours} from './module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleCours])],
  controllers: [ModuleCoursController],
  providers: [ModuleCoursService],
})
export class ModuleCoursModule {}
