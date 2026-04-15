import { IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';

export class UpdateParfumDto {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  country?: string;

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