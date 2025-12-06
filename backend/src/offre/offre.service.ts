import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offre } from './offre.entity';

@Injectable()
export class OffreService {
  constructor(
    @InjectRepository(Offre)
    private readonly offreRepository: Repository<Offre>
  ) {}

  async creerOffre(OffreData: Partial<Offre>): Promise<Offre> {
    const offre = this.offreRepository.create(OffreData);
    return this.offreRepository.save(offre);
  }

  async obtenirListeOffre(): Promise<Offre[]> {
    return this.offreRepository.find();
  }

  async obtenirOffreParRef(ref: number) : Promise<Offre> {
    const offre = await this.offreRepository.findOne({ where: { ref: ref } });
    if(!offre) {
        throw new NotFoundException(`Offre with ${ref} not found`);
    }
    return offre;
  }

  async supprimerOffre(ref: number): Promise<string> {
    const result = await this.offreRepository.delete(ref);
    if(result.affected === 0) {
        return `Offre with ${ref} not found`;
    }
    return `Offre ${ref} deleted`;
  }

  async modifierOffre(ref: number, offreData: Partial<Offre>): Promise<Offre> {
    let offre = await this.offreRepository.findOne({ where: { ref: ref } });
    if(!offre) {
        throw new NotFoundException(`Offre with ${ref} not found`);
    }
    await this.offreRepository.update(ref, offreData);
    return this.offreRepository.findOne({ where: { ref: ref } });
  }
}
