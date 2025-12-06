import { Cours } from "src/cours/cours.entity";
import { Inscription } from "src/inscription/inscription.entity";
import { Catalogue } from "src/publication/entities/catalogue.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ModuleCours {
    @PrimaryGeneratedColumn()
    idModule: number;

    @Column()
    nomModule: string;

    @Column()
    matiere: string;

    @Column()
    frais: number;

    @ManyToOne(() => Catalogue, (catalogue) => catalogue.moduleCours, { onDelete: 'CASCADE' })
    catalogue: Catalogue;

    @OneToMany(() => Cours, (cours) => cours.moduleCours, { cascade: true } )
    cours: Cours[];

    @OneToMany(() => Inscription, (inscriptions) => inscriptions.moduleCours, { cascade: true })
    inscriptions: Inscription[];
}
