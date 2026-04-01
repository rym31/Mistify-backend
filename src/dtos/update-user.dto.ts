<<<<<<< HEAD
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

=======
import { IsEmail, IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email : string;

    
    @IsString()
    @IsOptional()
    password : string;
>>>>>>> 83a6d7bc20f4a6797f2c41d0fd7b8236f4decaf2
}