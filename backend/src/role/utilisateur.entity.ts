import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UtilisateurRole } from "./utilisateur-role.enum";

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

    @OneToMany('Catalogue', 'utilisateur')
    catalogues: any[];

    @OneToMany('Annonce', 'utilisateur')
    annonces: any[];

    @OneToMany('Inscription', 'utilisateur')
    inscriptions: any[];
}