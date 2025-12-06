import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UtilisateurRole } from "./utilisateur-role.enum";
import { Catalogue } from "src/publication/entities/catalogue.entity";
import { Annonce } from "src/publication/entities/annonce.entity";
import { Inscription } from "src/inscription/inscription.entity";

@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    profile: string;

    @Column()
    nom: string;

    @Column()
    prenoms: string;

    @Column()
    tel: string;

    @Column()
    email: string;

    @Column()
    dateNaissance: string;

    @Column()
    mdp: string;

    @Column({ type: 'enum', enum: UtilisateurRole })
    role: UtilisateurRole;

    @OneToMany(() => Catalogue, (catalogue) => catalogue.utilisateur, { cascade: true })
    catalogues: Catalogue[];

    @OneToMany(() => Annonce, (annonces) => annonces.utilisateur, { cascade: true })
    annonces: Annonce[];

    @OneToMany(() => Inscription, (inscriptions) => inscriptions.utilisateur, { cascade: true })
    inscriptions: Inscription[];
}