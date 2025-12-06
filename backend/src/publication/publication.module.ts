import { Module } from '@nestjs/common';
import { CatalogueModule } from './catalogue.module';
import { AnnonceModule } from './annonce.module';

@Module({
  imports: [CatalogueModule, AnnonceModule]
})
export class PublicationModule {}
