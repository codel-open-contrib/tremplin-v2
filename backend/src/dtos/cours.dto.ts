import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCoursDto {
    @IsNotEmpty()
    designation: string;

    @IsNotEmpty()
    horaire: number;
}

export class UpdateCoursDto {
    @IsOptional()
    @IsNotEmpty()
    designation: string;

    @IsOptional()
    @IsNotEmpty()
    horaire: number;
}