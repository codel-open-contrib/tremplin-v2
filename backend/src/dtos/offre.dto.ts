import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOffreDto {
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    specification: string;

    @IsNotEmpty()
    tarif: number;
}

export class UpdateOffreDto {
    @IsOptional()
    @IsNotEmpty()
    type: string;

    @IsOptional()
    @IsNotEmpty()
    specification: string;

    @IsOptional()
    @IsNotEmpty()
    tarif: number;
}