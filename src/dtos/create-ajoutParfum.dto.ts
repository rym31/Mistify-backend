import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAjoutParfumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}