import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OffreService } from './offre.service';
import { Offre } from './offre.entity';
import { CreateOffreDto, UpdateOffreDto } from 'src/dtos/offre.dto';

@Controller('offre')
export class OffreController {
  constructor(private readonly offreService: OffreService) {}

  @Get()
  obtenirListeOffre(): Promise<Offre[]> {
      return this.offreService.obtenirListeOffre();
  }

  @Post()
  ajouterOffre(@Body() OffreData: CreateOffreDto): Promise<Offre> {
      return this.offreService.creerOffre(OffreData);
  }

  @Get(':ref')
  obtenirOffreParID(@Param('ref') ref: number): Promise<Offre> {
      return this.offreService.obtenirOffreParRef(ref);
  }

  @Delete(':ref')
  supprimerOffre(@Param('ref') ref: number): Promise<string> {
      return this.offreService.supprimerOffre(ref);
  }

  @Put(':ref')
  modifierOffre(@Param('ref') ref: number, @Body() OffreData: UpdateOffreDto): Promise<Offre> {
      return this.offreService.modifierOffre(ref, OffreData);
  }
}
