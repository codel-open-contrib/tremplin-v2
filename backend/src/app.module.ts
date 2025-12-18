import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import db from './db';
import { CpModule } from './cp/cp.module';
import { MinioModule } from './minio/minio.module';
import { HealthController } from './health.controller';
import { UtilisateurModule } from './role/utilisateur.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { CoursModule } from './cours/cours.module';
import { InscriptionModule } from './inscription/inscription.module';
import { ModuleCoursModule } from './module/module-cours.module';
import { OffreModule } from './offre/offre.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    CpModule,
    MinioModule,
    UtilisateurModule,
    AbonnementModule,
    CoursModule,
    InscriptionModule,
    ModuleCoursModule,
    OffreModule,
    PublicationModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
