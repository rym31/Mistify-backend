import { IsIn, IsNotEmpty, IsString, IsOptional, IsUrl, IsNumber } from 'class-validator';

export class CreateAjoutParfumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  volume?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Frais', 'Sucré', 'Boisé', 'Épicé'])
  family: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsNotEmpty()
  userId: number;

}
