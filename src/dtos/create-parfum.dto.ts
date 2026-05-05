import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
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

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  topNote?: string;

  @IsString()
  @IsOptional()
  middleNote?: string;

  @IsString()
  @IsOptional()
  baseNote?: string;
}
