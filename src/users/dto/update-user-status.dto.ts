import { IsBoolean, IsNotEmpty } from "class-validator";

export default class UpdateUserStateDto{
    @IsNotEmpty()
    @IsBoolean()
    status:boolean;
}