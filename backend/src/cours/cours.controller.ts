import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CoursService } from './cours.service';
import { Cours } from './cours.entity';
import { CreateCoursDto, UpdateCoursDto } from 'src/dtos/cours.dto';

@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Get()
  obtenirListeCours(): Promise<Cours[]> {
      return this.coursService.obtenirListeCours();
  }

  @Post(':idModule')
  ajouterCours(@Param('idModule') idModule: number, @Body() coursData: CreateCoursDto): Promise<Cours> {
      return this.coursService.creerCours(idModule ,coursData);
  }

  @Get(':code')
  obtenirCoursParID(@Param('code') code: number): Promise<Cours> {
      return this.coursService.obtenirCoursParCode(code);
  }

  @Delete(':code')
  supprimerCours(@Param('code') code: number): Promise<string> {
      return this.coursService.supprimerCours(code);
  }

  @Put(':code')
  modifierCours(@Param('code') code: number, @Body() coursData: UpdateCoursDto): Promise<Cours> {
      return this.coursService.modifierCours(code, coursData);
  }
}
