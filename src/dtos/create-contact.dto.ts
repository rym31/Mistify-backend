import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { TypeDemande } from '../contacts/contacts.entity';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  nom!: string;

  @IsEmail()
  email!: string;

  @IsEnum(TypeDemande)
  @IsOptional()
  type?: TypeDemande;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
