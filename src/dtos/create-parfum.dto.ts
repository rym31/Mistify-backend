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
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

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
}
