import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offre {
    @PrimaryGeneratedColumn()
    ref: number;

    @Column()
    type: string;

    @Column()
    specification: string;

    @Column()
    tarif: number;
}
