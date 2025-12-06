import { Controller, Post, Get, Delete ,Put, Body, Param } from '@nestjs/common';
import { Annonce } from 'src/publication/entities/annonce.entity';
import { AnnonceService } from 'src/publication/services/annonce/annonce.service';
import { CreateAnnonceDto, UpdateAnnonceDto } from 'src/dtos/publication.dto';

@Controller('annonce')
export class AnnonceController {
    constructor(
        private readonly annonceService: AnnonceService
    ) {}

    @Post(':uid')
    creerAnnonce(@Param('uid') uid: number, @Body() annonceData: CreateAnnonceDto): Promise<Annonce> {
        return this.annonceService.creerAnnonce(uid, annonceData);
    }

    @Get()
    obtenirListeAnnonce(): Promise<Annonce[]> {
        return this.annonceService.obtenirListeAnnonce();
    }

    @Get(':ref')
    obtenirAnnonceParRef(@Param('ref') ref: number): Promise<Annonce> {
        return this.annonceService.obtenirAnnonceParRef(ref);
    }

    @Delete(':ref')
    supprimerAnnonce(@Param('ref') ref: number): Promise<string> {
        return this.annonceService.supprimerAnnonce(ref);
    }

    @Put(':ref')
    modifierAnnonce(@Param('ref') ref: number, @Body() annonceData: UpdateAnnonceDto): Promise<Annonce> {
        return this.annonceService.modifierAnnonce(ref, annonceData);
    }
}
