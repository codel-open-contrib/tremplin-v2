import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { Inscription } from './inscription.entity';
import { CreateInscriptionDto, UpdateInscriptionDto } from '../dtos/inscription.dto';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Get()
  obtenirListeInscription(): Promise<Inscription[]> {
      return this.inscriptionService.obtenirListeInscription();
  }

  @Post(':uid/:idModule')
  ajouterInscription(@Param('uid') uid: number, @Param('idModule') idModule: number, @Body() coursData: CreateInscriptionDto): Promise<Inscription> {
      return this.inscriptionService.creerInscription(uid, idModule, coursData);
  }

  @Get(':idInscription')
  obtenirInscriptionParIdInscription(@Param('idInscription') idInscription: number): Promise<Inscription> {
      return this.inscriptionService.obtenirInscriptionParIdInscription(idInscription);
  }

  @Delete(':idInscription')
  supprimerInscription(@Param('idInscription') idInscription: number): Promise<string> {
      return this.inscriptionService.supprimerInscription(idInscription);
  }

  @Put(':idInscription')
  modifierInscription(@Param('idInscription') idInscription: number, @Body() coursData: UpdateInscriptionDto): Promise<Inscription> {
      return this.inscriptionService.modifierInscription(idInscription, coursData);
  }
}
