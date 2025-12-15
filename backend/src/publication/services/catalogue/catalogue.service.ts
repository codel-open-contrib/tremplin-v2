import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalogue } from 'src/publication/entities/catalogue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogueService {
    constructor(
        @InjectRepository(Catalogue)
        private readonly catalogueRepository: Repository<Catalogue>
    ) {}

    async creerCatalogue(uid: number, catalogueData: Partial<Catalogue>): Promise<Catalogue> {
        const catalogue = this.catalogueRepository.create({
            utilisateur: { uid: uid },
            description: catalogueData.description,
            lienAffichage: catalogueData.lienAffichage,
            formatAffichage: catalogueData.lienAffichage,
            date: catalogueData.date,
            temps: catalogueData.temps,
        })
        return this.catalogueRepository.save(catalogue);
    }

    async obtenirListeCatalogue(): Promise<Catalogue[]> {
        return this.catalogueRepository.find({
            relations: ['utilisateur', 'moduleCours']
        });
    }

    async obtenirCatalogueParRef(ref: number) : Promise<Catalogue> {
        const catalogue = await this.catalogueRepository.findOne({ 
            where: { ref: ref },
            relations: ['moduleCours']
        });
        if(!catalogue) {
            throw new NotFoundException(`Catalogue with ${ref} not found`);
        }
        return catalogue;
    }

    async supprimerCatalogue(ref: number): Promise<string> {
        const result = await this.catalogueRepository.delete(ref);
        if(result.affected === 0) {
            return `Catalogue with ${ref} not found`;
        }
        return `Catalogue ${ref} deleted`;
    }

    async modifierCatalogue(ref: number, catalogueData: Partial<Catalogue>): Promise<Catalogue> {
        const catalogue = await this.catalogueRepository.findOne({ where: { ref: ref } });
        if(!catalogue) {
            throw new NotFoundException(`Catalogue with ${ref} not found`);
        }
        await this.catalogueRepository.update(ref, catalogueData);
        return this.catalogueRepository.findOne({ where: { ref: ref } });
    }
}
