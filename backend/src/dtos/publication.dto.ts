import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePublicationDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    lienAffichage: string;

    @IsNotEmpty()
    formatAffichage: string;

    @IsNotEmpty()
    date: string;
}

export class UpdatePublicationDto {
    @IsOptional()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    lienAffichage: string;

    @IsOptional()
    @IsNotEmpty()
    formatAffichage: string;

    @IsOptional()
    @IsNotEmpty()
    date: string;
}

export class CreateCatalogueDto extends CreatePublicationDto {}

export class UpdateCatalogueDto extends UpdatePublicationDto {}

export class UpdateAnnonceDto extends UpdatePublicationDto {}

export class CreateAnnonceDto extends CreatePublicationDto {}