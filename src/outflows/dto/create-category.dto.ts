import { IsNotEmpty,IsNumber } from "class-validator";
import { BaseNameDto } from "src/common/dtos/BaseNameDto";

export class CreateCategoryDto extends BaseNameDto{

    @IsNotEmpty()
    @IsNumber()
    outflowTypeId:number;
}