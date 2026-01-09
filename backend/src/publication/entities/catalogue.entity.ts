import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Publication } from "./publication.entity";
import { ModuleCours } from "../../module/module.entity";

@Entity()
export class Catalogue extends Publication {
    @ManyToOne('Utilisateur', 'catalogues')
    utilisateur: any;

    @OneToMany(() => ModuleCours, (moduleCours) => moduleCours.catalogue, { cascade: true, onDelete: 'CASCADE' })
    moduleCours: ModuleCours[]
}