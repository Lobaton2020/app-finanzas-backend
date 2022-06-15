import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateInflowDto, IInflowPorcent } from './create-inflow.dto';

interface IInflowPorcentUpdate extends IInflowPorcent{
    inflowDepositId:number,
}

class InflowPorcentUpdateDto implements IInflowPorcentUpdate{
    @IsNumber()
    porcent:number;
    @IsNumber()
    depositId:number;
    @IsNumber()
    inflowDepositId:number;
}

export class UpdateInflowDto extends OmitType(CreateInflowDto, ['porcents'] as const){

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(()=>InflowPorcentUpdateDto)
    porcents:IInflowPorcentUpdate[];

}
