import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";

export class CreateOutflowDto{

    @IsNotEmpty()
    @IsNumber()
    outflowTypeId:number;

    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    @IsNotEmpty()
    @IsNumber()
    depositId:number;

    @IsNumber({},{each: true})
    tagsId:number[];

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