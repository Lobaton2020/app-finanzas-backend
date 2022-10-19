import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateInflowDto, IInflowPorcent } from './create-inflow.dto';

interface IInflowPorcentUpdate extends IInflowPorcent{
    inflowDepositId:number,
}

class InflowPorcentUpdateDto implements IInflowPorcentUpdate {
  @ApiProperty()
  @IsNumber()
  porcent: number;

  @ApiProperty()
  @IsNumber()
  depositId: number;

  @ApiProperty()
  @IsNumber()
  inflowDepositId: number;
}

export class UpdateInflowDto extends OmitType(CreateInflowDto, ['porcents'] as const) {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => InflowPorcentUpdateDto)
  porcents: IInflowPorcentUpdate[];
}
