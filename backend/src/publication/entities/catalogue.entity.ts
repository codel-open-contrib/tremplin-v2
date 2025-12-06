import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Publication } from "./publication.entity";
import { Utilisateur } from "src/role/utilisateur.entity";
import { ModuleCours } from "src/module/module.entity";

@Entity()
export class Catalogue extends Publication {
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.catalogues)
    utilisateur: Utilisateur;

    @OneToMany(() => ModuleCours, (moduleCours) => moduleCours.catalogue, { cascade: true, onDelete: 'CASCADE' })
    moduleCours: ModuleCours[]
}