import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAbonnementDto {
    @IsNotEmpty()
    dateDebut: string;

    @IsNotEmpty()
    dateExpiration: string;

    @IsNotEmpty()
    estPaye: boolean;
}

export class UpdateAbonnementDto {
    @IsOptional()
    @IsNotEmpty()
    dateDebut: string;

    @IsOptional()
    @IsNotEmpty()
    dateExpiration: string;

    @IsOptional()
    @IsNotEmpty()
    estPaye: boolean;
}