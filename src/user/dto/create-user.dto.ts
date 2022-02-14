import { IsDateString, IsEmail, IsInt,IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsInt()
    rolId:string;

    @IsNotEmpty()
    @IsInt()
    documentTypeId:string;

    @IsNotEmpty()
    @Min(10000)
    @Max(1000000000000000)
    @IsInt()
    documentNumber:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    completeName:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    /**
     @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/g, {
       message:
       'Password must be between 6 and 64 characters long with 1 special character and capital character each',
      })
    */
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string;

    @IsOptional()
    @IsString()
    image:string;

    @IsDateString()
    @IsNotEmpty()
    bornDate:Date;

}