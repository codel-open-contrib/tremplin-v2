import { ModuleCours } from "../module/module.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cours {
    @PrimaryGeneratedColumn()
    code: number;

    @Column()
    designation: string;

    @Column()
    horaire: number;

    @ManyToOne(() => ModuleCours, (moduleCours) => moduleCours.cours)
    moduleCours: ModuleCours;
}
