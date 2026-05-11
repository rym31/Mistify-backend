import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

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

  @IsString()
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

  @IsString()
  @IsOptional()
  family?: string;

  @IsNumber()
  @IsOptional()
  volume?: number;

  @IsBoolean()
  @IsOptional()
  disponibility?: boolean;

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
