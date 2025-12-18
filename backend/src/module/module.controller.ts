import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ModuleCoursService } from './module.service';
import { ModuleCours } from './module.entity';
import { CreateModuleDto, UpdateModuleDto } from '../dtos/module.dto';

@Controller('module')
export class ModuleCoursController {
  constructor(private readonly moduleCoursService: ModuleCoursService) {}

  @Get()
  obtenirListeModuleCours(): Promise<ModuleCours[]> {
      return this.moduleCoursService.obtenirListeModuleCours();
  }

  @Post(':refCatalogue')
  ajouterModuleCours(@Param('refCatalogue') refCatalogue: number, @Body() moduleCoursData: CreateModuleDto): Promise<ModuleCours> {
      return this.moduleCoursService.creerModuleCours(refCatalogue, moduleCoursData);
  }

  @Get(':idModule')
  obtenirModuleCoursParIdModule(@Param('idModule') idModule: number): Promise<ModuleCours> {
      return this.moduleCoursService.obtenirModuleCoursParIdModule(idModule);
  }

  @Delete(':idModule')
  supprimerModuleCours(@Param('idModule') idModule: number): Promise<string> {
      return this.moduleCoursService.supprimerModuleCours(idModule);
  }

  @Put(':idModule')
  modifierModuleCours(@Param('idModule') idModule: number, @Body() moduleCoursData: UpdateModuleDto): Promise<ModuleCours> {
      return this.moduleCoursService.modifierModuleCours(idModule, moduleCoursData);
  }
}
