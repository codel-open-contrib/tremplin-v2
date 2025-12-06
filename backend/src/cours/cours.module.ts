import { Module } from '@nestjs/common';
import { CoursService } from './cours.service';
import { CoursController } from './cours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cours } from './cours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cours])],
  controllers: [CoursController],
  providers: [CoursService],
})
export class CoursModule {}
