import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Publication {
    @PrimaryGeneratedColumn()
    ref: number;

    @Column()
    description: string;

    @Column()
    lienAffichage: string;

    @Column()
    formatAffichage: string;

    @Column()
    date: string;

    @Column()
    temps: string;
}
