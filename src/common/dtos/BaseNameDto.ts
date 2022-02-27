import { IsNotEmpty,IsNumber,IsString } from "class-validator";

export class BaseNameDto {

    @IsNotEmpty()
    @IsString()
    name:string;

}

export class BaseNameAndUserIdDto extends BaseNameDto{
    @IsNotEmpty()
    @IsNumber()
    userId:number;
}