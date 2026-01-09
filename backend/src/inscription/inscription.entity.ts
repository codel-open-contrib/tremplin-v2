import { ModuleCours } from "../module/module.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inscription {
    @PrimaryGeneratedColumn()
    idInscription: number;

    @Column()
    dateInscription: string;

    @Column()
    montant: number

    @Column()
    estPayee: boolean;

    @ManyToOne(() => ModuleCours, (moduleCours) => moduleCours.inscriptions, { onDelete: 'CASCADE' })
    moduleCours: ModuleCours;

    @ManyToOne('Utilisateur', 'inscriptions', { onDelete: 'CASCADE' })
    utilisateur: unknown;
}
