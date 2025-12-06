import { Injectable, NotFoundException } from '@nestjs/common';
import { Abonnement } from './abonnement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AbonnementService {
  constructor(
    @InjectRepository(Abonnement)
    private readonly abonnementRepository: Repository<Abonnement>
  ) {}

  async creerAbonnement(abonnementData: Partial<Abonnement>): Promise<Abonnement> {
    const abonnement = this.abonnementRepository.create(abonnementData);
    return this.abonnementRepository.save(abonnement);
  }

  async obtenirListeAbonnement(): Promise<Abonnement[]> {
    return this.abonnementRepository.find();
  }

  async obtenirAbonnementParRef(ref: number) : Promise<Abonnement> {
    const abonnement = await this.abonnementRepository.findOne({ where: { ref: ref } });
    if(!abonnement) {
        throw new NotFoundException(`Abonnement with ${ref} not found`);
    }
    return abonnement;
  }

  async supprimerAbonnement(ref: number): Promise<string> {
    const result = await this.abonnementRepository.delete(ref);
    if(result.affected === 0) {
        return `Abonnement with ${ref} not found`;
    }
    return `Abonnement ${ref} deleted`;
  }

  async modifierAbonnement(ref: number, abonnementData: Partial<Abonnement>): Promise<Abonnement> {
    let abonnement = await this.abonnementRepository.findOne({ where: { ref: ref } });
    if(!abonnement) {
        throw new NotFoundException(`Abonnement with ${ref} not found`);
    }
    await this.abonnementRepository.update(ref, abonnementData);
    return this.abonnementRepository.findOne({ where: { ref: ref } });
  }
}
