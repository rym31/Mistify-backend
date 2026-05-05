import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";

export class CreateFamilleOlfactiveDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsOptional()
    notes?: string[];
}