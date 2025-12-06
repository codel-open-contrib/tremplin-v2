import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cours } from './cours.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursService {
  constructor(
    @InjectRepository(Cours)
    private readonly coursRepository: Repository<Cours>
  ) {}

  async creerCours(idModule: number,coursData: Partial<Cours>): Promise<Cours> {
    const cours = this.coursRepository.create({
      moduleCours: {
        idModule: idModule
      },
      designation: coursData.designation,
      horaire: coursData.horaire
    });
    return this.coursRepository.save(cours);
  }

  async obtenirListeCours(): Promise<Cours[]> {
    return this.coursRepository.find();
  }

  async obtenirCoursParCode(code: number) : Promise<Cours> {
    const cours = await this.coursRepository.findOne({ where: { code: code } });
    if(!cours) {
        throw new NotFoundException(`Cours with ${code} not found`);
    }
    return cours;
  }

  async supprimerCours(code: number): Promise<string> {
    const result = await this.coursRepository.delete(code);
    if(result.affected === 0) {
        return `Cours with ${code} not found`;
    }
    return `Cours ${code} deleted`;
  }

  async modifierCours(code: number, coursData: Partial<Cours>): Promise<Cours> {
    let cours = await this.coursRepository.findOne({ where: { code: code } });
    if(!cours) {
        throw new NotFoundException(`Cours with ${code} not found`);
    }
    await this.coursRepository.update(code, coursData);
    return this.coursRepository.findOne({ where: { code: code } });
  }
}
