import { Injectable, NotFoundException } from '@nestjs/common';
import { Inscription } from './inscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InscriptionService {
  constructor(
    @InjectRepository(Inscription)
    private readonly inscriptionRepository: Repository<Inscription>
  ) {}

  async creerInscription(uid: number, idModule: number, inscriptionData: Partial<Inscription>): Promise<Inscription> {
    const inscription = this.inscriptionRepository.create({
      moduleCours: {
        idModule: idModule
      },
      utilisateur: {
        uid: uid
      },
      montant: inscriptionData.montant,
      dateInscription: inscriptionData.dateInscription,
      estPayee: inscriptionData.estPayee,

    });
    return this.inscriptionRepository.save(inscription);
  }

  async obtenirListeInscription(): Promise<Inscription[]> {
    return this.inscriptionRepository.find({
      relations: ['moduleCours', 'utilisateur']
    });
  }

  async obtenirInscriptionParIdInscription(idInscription: number) : Promise<Inscription> {
    const inscription = await this.inscriptionRepository.findOne({ where: { idInscription: idInscription } });
    if(!inscription) {
        throw new NotFoundException(`Inscription with ${idInscription} not found`);
    }
    return inscription;
  }

  async supprimerInscription(idInscription: number): Promise<string> {
    const result = await this.inscriptionRepository.delete(idInscription);
    if(result.affected === 0) {
        return `Inscription with ${idInscription} not found`;
    }
    return `Inscription ${idInscription} deleted`;
  }

  async modifierInscription(idInscription: number, InscriptionData: Partial<Inscription>): Promise<Inscription> {
    let inscription = await this.inscriptionRepository.findOne({ where: { idInscription: idInscription } });
    if(!inscription) {
        throw new NotFoundException(`Inscription with ${idInscription} not found`);
    }
    await this.inscriptionRepository.update(idInscription, InscriptionData);
    return this.inscriptionRepository.findOne({ where: { idInscription: idInscription } });
  }
}
