import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateInscriptionDto {
    @IsNotEmpty()
    dateInscription: string;

    @IsNotEmpty()
    montant: number;

    @IsNotEmpty()
    estPayee: boolean;
}

export class UpdateInscriptionDto {
    @IsOptional()
    @IsNotEmpty()
    dateInscription: string;

    @IsOptional()
    @IsNotEmpty()
    montant: number;

    @IsOptional()
    @IsNotEmpty()
    estPayee: boolean;
}