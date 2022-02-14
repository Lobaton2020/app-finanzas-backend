import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateOutflowDto{
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsNumber()
    outflowTypeId:number;

    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    @IsNotEmpty()
    @IsNumber()
    depositId:number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsDateString()
    setDate:Date;

}