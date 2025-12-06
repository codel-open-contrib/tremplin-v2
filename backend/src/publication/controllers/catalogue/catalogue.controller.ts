import { Controller, Post, Get, Delete ,Put, Body, Param } from '@nestjs/common';
import { Catalogue } from 'src/publication/entities/catalogue.entity';
import { CatalogueService } from 'src/publication/services/catalogue/catalogue.service';
import { CreateCatalogueDto, UpdateCatalogueDto } from 'src/dtos/publication.dto';

@Controller('catalogue')
export class CatalogueController {
    constructor(
        private readonly catalogueService: CatalogueService
    ) {}

    /* catalogue */
    @Post(':uid')
    creerCatalogue(@Param('uid') uid: number, @Body() catalogueData: CreateCatalogueDto): Promise<Catalogue> {
        return this.catalogueService.creerCatalogue(uid, catalogueData);
    }

    @Get()
    obtenirListeCatalogue(): Promise<Catalogue[]> {
        return this.catalogueService.obtenirListeCatalogue();
    }

    @Get(':ref')
    obtenirCatalogueParRef(@Param('ref') ref: number): Promise<Catalogue> {
        return this.catalogueService.obtenirCatalogueParRef(ref);
    }

    @Delete(':ref')
    supprimerCatalogue(@Param('ref') ref: number): Promise<string> {
        return this.catalogueService.supprimerCatalogue(ref);
    }

    @Put(':ref')
    modifierCatalogue(@Param('ref') ref: number, @Body() catalogueData: UpdateCatalogueDto): Promise<Catalogue> {
        return this.catalogueService.modifierCatalogue(ref, catalogueData);
    }
}
