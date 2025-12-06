import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Annonce } from "./entities/annonce.entity";
import { AnnonceService } from "./services/annonce/annonce.service";
import { AnnonceController } from './controllers/annonce/annonce.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Annonce])],
    providers: [AnnonceService],
    controllers: [AnnonceController]
})
export class AnnonceModule {}