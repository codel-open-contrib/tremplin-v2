import { Injectable, NotFoundException } from '@nestjs/common';
import { Utilisateur } from './utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateurService {
    constructor(
        @InjectRepository(Utilisateur)
        private readonly utilisateurRepository: Repository<Utilisateur>
    ) {}

    async ajouterUtilisateur(utilisateurData: Partial<Utilisateur>): Promise<Utilisateur> {
        const utilisateur = this.utilisateurRepository.create(utilisateurData);
        return this.utilisateurRepository.save(utilisateur);
    }
    
    async obtenirListeUtilisateur(): Promise<Utilisateur[]> {
        return this.utilisateurRepository.find({
            relations: ['catalogues', 'annonces', 'inscriptions']
        });
    }

    async obtenirUtilisateurParID(uid: number) : Promise<Utilisateur> {
        const utilisateur = await this.utilisateurRepository.findOne({ 
            where: { uid: uid },
            relations: ['catalogues', 'annonces', 'inscriptions']
        });
        if(!utilisateur) {
            throw new NotFoundException(`Utilisateur with ${uid} not found`);
        }
        return utilisateur;
    }

    async supprimerUtilisateur(uid: number): Promise<string> {
        const result = await this.utilisateurRepository.delete(uid);
        if(result.affected === 0) {
            return `Utilisateur with ${uid} not found`;
        }
        return `Utilisateur ${uid} deleted`;
    }

    async modifierUtilisateur(uid: number, utilisateurData: Partial<Utilisateur>): Promise<Utilisateur> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { uid: uid } });
        if(!utilisateur) {
            throw new NotFoundException(`Utilisateur with ${uid} not found`);
        }
        await this.utilisateurRepository.update(uid, utilisateurData);
        return this.utilisateurRepository.findOne({ where: { uid: uid } });
    }

    async seConnecter(utilisateurData: unknown): Promise<object> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { email: utilisateurData.email } });

        if(!utilisateur) {
            return {
                "errors": {
                    "email": true,
                    "mdp": true
                }
            }
        }
        if(utilisateur.mdp == utilisateurData.mdp) {
            return {
                "errors": {
                    "email": false,
                    "mdp": false
                },
                "data": {
                    "uid": utilisateur.uid,
                    "profile": utilisateur.profile,
                    "nom": utilisateur.mdp as unknown.nom,
                    "prenoms": utilisateur.prenoms,
                    "tel": utilisateur.tel,
                    "email": utilisateur.email
                }
            }
        }
        return {
            "errors": {
                "email": false,
                "mdp": true
            }
        }
    }
    
    async obtenirUtilisateurParEmail(email: string): Promise<boolean> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { email: email } });
        if(utilisateur) {
            return true;
        }
        return false;
    }
}
