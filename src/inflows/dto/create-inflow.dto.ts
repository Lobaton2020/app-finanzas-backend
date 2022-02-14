import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface InflowPorcent{
    porcent:number,
    depositId:number
}

export class CreateInflowDto{
    @IsNotEmpty()
    @IsNumber()
    inflowTypeId:number;

    @IsNotEmpty()
    @IsNumber()
    total:number;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsDateString()
    setDate:Date;

    @IsNotEmpty()
    @IsNumber()
    userId:number;


    @IsNotEmpty()
    @IsArray()
    porcents:InflowPorcent[];
}