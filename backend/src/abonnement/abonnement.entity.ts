import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Abonnement {
    @PrimaryGeneratedColumn()
    ref: number;

    @Column()
    dateDebut: string;

    @Column()
    dateExpiration: string;

    @Column()
    estPaye: boolean;
}
