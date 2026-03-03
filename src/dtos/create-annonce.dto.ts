import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnnonceDto {

  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  sellerId: number;

  @IsInt()
  parfumId: number;
}