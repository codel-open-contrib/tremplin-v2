import { Module } from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { AbonnementController } from './abonnement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abonnement } from './abonnement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abonnement])],
  controllers: [AbonnementController],
  providers: [AbonnementService],
})
export class AbonnementModule {}
