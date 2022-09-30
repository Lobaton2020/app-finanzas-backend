import { IsDateString, IsEmail, IsInt,IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import { IsPassword } from '../../common/decorators/is-password.decorator'

export class CreateUserDto {
  @IsOptional()
  @IsInt()
  documentTypeId: string;

  @IsOptional()
  @Min(10000)
  @Max(1000000000000000)
  @IsInt()
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  completeName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPassword()
  password: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  bornDate: Date;
}