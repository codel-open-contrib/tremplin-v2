import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from 'src/publication/entities/annonce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnonceService {
    constructor(
        @InjectRepository(Annonce)
        private readonly annonceRepository: Repository<Annonce>
    ) {}

    async creerAnnonce(uid: number, annonceData: Partial<Annonce>): Promise<Annonce> {
        const annonce = this.annonceRepository.create({
            utilisateur: { uid: uid },
            description: annonceData.description,
            lienAffichage: annonceData.lienAffichage,
            formatAffichage: annonceData.lienAffichage,
            date: annonceData.date,
            temps: annonceData.temps,
        });
        return this.annonceRepository.save(annonce);
    }
    
    async obtenirListeAnnonce(): Promise<Annonce[]> {
        return this.annonceRepository.find();
    }

    async obtenirAnnonceParRef(ref: number) : Promise<Annonce> {
        const annonce = await this.annonceRepository.findOne({ where: { ref: ref } });
        if(!annonce) {
            throw new NotFoundException(`Annonce with ${ref} not found`);
        }
        return annonce;
    }

    async supprimerAnnonce(ref: number): Promise<string> {
        const result = await this.annonceRepository.delete(ref);
        if(result.affected === 0) {
            return `Annonce with ${ref} not found`;
        }
        return `Annonce ${ref} deleted`;
    }

    async modifierAnnonce(ref: number, annonceData: Partial<Annonce>): Promise<Annonce> {
        const annonce = await this.annonceRepository.findOne({ where: { ref: ref } });
        if(!annonce) {
            throw new NotFoundException(`Annonce with ${ref} not found`);
        }
        await this.annonceRepository.update(ref, annonceData);
        return this.annonceRepository.findOne({ where: { ref: ref } });
    }
}
