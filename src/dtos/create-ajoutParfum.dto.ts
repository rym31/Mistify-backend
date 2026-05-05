import { IsNotEmpty, IsString, IsOptional, IsUrl, IsNumber } from 'class-validator';

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

  @IsNotEmpty()
  userId: number;

}