import { IsNotEmpty, IsOptional } from "class-validator";
import { UtilisateurRole } from "../role/utilisateur-role.enum";

export class LoginUtilisateurDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mdp: string;
}

export class CreateUtilisateurDto {
    @IsNotEmpty()
    profile: string;

    @IsNotEmpty()
    nom: string;
    
    @IsNotEmpty()
    prenoms: string;
    
    @IsNotEmpty()
    tel: string;
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mdp: string;

    @IsNotEmpty()
    role: UtilisateurRole;

    @IsNotEmpty()
    dateNaissance: string;
}

export class UpdateUtilisateurDto {
    @IsOptional()
    @IsNotEmpty()
    profile: string;

    @IsOptional()
    @IsNotEmpty()
    nom: string;

    @IsOptional()
    @IsNotEmpty()
    prenoms: string;
    
    @IsOptional()
    @IsNotEmpty()
    tel: string;
    
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    mdp: string;

    @IsOptional()
    @IsNotEmpty()
    role: UtilisateurRole;   
    
    @IsOptional()
    @IsNotEmpty()
    dateNaissance: string;
}