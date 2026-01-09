import { Entity, ManyToOne } from "typeorm";
import { Publication } from "./publication.entity";

@Entity()
export class Annonce extends Publication {
    @ManyToOne('Utilisateur', 'annonces')
    utilisateur: unknown;
}