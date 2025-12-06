import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateModuleDto {
    @IsNotEmpty()
    nomModule: string;

    @IsNotEmpty()
    matiere: string;

    @IsNotEmpty()
    frais: number;
}

export class UpdateModuleDto {
    @IsOptional()
    @IsNotEmpty()
    nomModule: string;

    @IsOptional()
    @IsNotEmpty()
    matiere: string;

    @IsOptional()
    @IsNotEmpty()
    frais: number;
}