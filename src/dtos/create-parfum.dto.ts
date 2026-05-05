import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsBoolean,
} from 'class-validator';

export class CreateParfumDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsOptional()
  description?: string;


  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  family?: string;

  @IsNumber()
  @IsOptional()
  year?: number;
<<<<<<< HEAD
=======

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsBoolean()
  @IsOptional()
  disponibility?: boolean;

  @IsNumber()
  @IsOptional()
  volume?: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
>>>>>>> e770081f8ad4e1dd51cc18934c86ff0ddece7de2
}
