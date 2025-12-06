import { Entity, ManyToOne } from "typeorm";
import { Publication } from "./publication.entity";
import { Utilisateur } from "src/role/utilisateur.entity";

@Entity()
export class Annonce extends Publication {
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.annonces)
    utilisateur: Utilisateur;
}