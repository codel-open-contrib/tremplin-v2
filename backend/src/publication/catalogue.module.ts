import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Catalogue } from "./entities/catalogue.entity";
import { CatalogueService } from "./services/catalogue/catalogue.service";
import { CatalogueController } from "./controllers/catalogue/catalogue.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Catalogue])],
    providers: [CatalogueService],
    controllers: [CatalogueController]
})
export class CatalogueModule {}