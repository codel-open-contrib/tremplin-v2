import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModule } from './role/utilisateur.module';
import { OffreModule } from './offre/offre.module';
import { CoursModule } from './cours/cours.module';
import { PublicationModule } from './publication/publication.module';
import { InscriptionModule } from './inscription/inscription.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { ModuleCoursModule } from './module/module-cours.module';
import { CpModule } from './cp/cp.module';
import { MinioModule } from './minio/minio.module';
import db from './db';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    UtilisateurModule,
    OffreModule,
    CoursModule,
    PublicationModule,
    InscriptionModule,
    AbonnementModule,
    ModuleCoursModule,
    CpModule,
    MinioModule
  ],
})
export class AppModule {}