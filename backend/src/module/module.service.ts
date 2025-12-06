import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleCours } from './module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleCoursService {
  constructor(
    @InjectRepository(ModuleCours)
    private readonly moduleCoursRepository: Repository<ModuleCours>
  ) {}

  async creerModuleCours(refCatalogue: number, moduleCoursData: Partial<ModuleCours>): Promise<ModuleCours> {
    const moduleCours = this.moduleCoursRepository.create({
      catalogue: {
        ref: refCatalogue
      },
      nomModule: moduleCoursData.nomModule,
      matiere: moduleCoursData.matiere,
      frais: moduleCoursData.frais
    });
    return this.moduleCoursRepository.save(moduleCours);
  }

  async obtenirListeModuleCours(): Promise<ModuleCours[]> {
    return this.moduleCoursRepository.find({
      relations: ['catalogue', 'cours', 'inscriptions']
    });
  }

  async obtenirModuleCoursParIdModule(idModule: number) : Promise<ModuleCours> {
    const moduleCours = await this.moduleCoursRepository.findOne({ 
      where: { idModule: idModule },
      relations: ['catalogue', 'cours', 'inscriptions']
    });
    if(!moduleCours) {
        throw new NotFoundException(`ModuleCours with ${idModule} not found`);
    }
    return moduleCours;
  }

  async supprimerModuleCours(idModule: number): Promise<string> {
    const result = await this.moduleCoursRepository.delete(idModule);
    if(result.affected === 0) {
        return `ModuleCours with ${idModule} not found`;
    }
    return `ModuleCours ${idModule} deleted`;
  }

  async modifierModuleCours(idModule: number, moduleCoursData: Partial<ModuleCours>): Promise<ModuleCours> {
    let moduleCours = await this.moduleCoursRepository.findOne({ where: { idModule: idModule } });
    if(!moduleCours) {
        throw new NotFoundException(`ModuleCours with ${idModule} not found`);
    }
    await this.moduleCoursRepository.update(idModule, moduleCoursData);
    return this.moduleCoursRepository.findOne({ where: { idModule: idModule } });
  }
}
