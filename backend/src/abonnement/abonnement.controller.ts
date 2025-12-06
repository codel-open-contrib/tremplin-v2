import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { Abonnement } from './abonnement.entity';
import { CreateAbonnementDto, UpdateAbonnementDto } from 'src/dtos/abonnement.dto';

@Controller('abonnement')
export class AbonnementController {
  constructor(private readonly abonnementService: AbonnementService) {}

  @Get()
  obtenirListeAbonnement(): Promise<Abonnement[]> {
      return this.abonnementService.obtenirListeAbonnement();
  }

  @Post()
  ajouterAbonnement(@Body() abonnementData: CreateAbonnementDto): Promise<Abonnement> {
      return this.abonnementService.creerAbonnement(abonnementData);
  }

  @Get(':ref')
  obtenirAbonnementParID(@Param('ref') ref: number): Promise<Abonnement> {
      return this.abonnementService.obtenirAbonnementParRef(ref);
  }

  @Delete(':ref')
  supprimerAbonnement(@Param('ref') ref: number): Promise<string> {
      return this.abonnementService.supprimerAbonnement(ref);
  }

  @Put(':ref')
  modifierAbonnement(@Param('ref') ref: number, @Body() abonnementData: UpdateAbonnementDto): Promise<Abonnement> {
      return this.abonnementService.modifierAbonnement(ref, abonnementData);
  }
}
