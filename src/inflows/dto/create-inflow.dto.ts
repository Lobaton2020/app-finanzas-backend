import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export interface IInflowPorcent {
  depositId: number;
  porcent: number;
}

export class InflowPorcentCreateDto implements IInflowPorcent {
  @IsNumber()
  porcent: number;
  @IsNumber()
  depositId: number;
}

export class CreateInflowDto {
  @IsNotEmpty()
  @IsNumber()
  inflowTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  setDate: Date;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => InflowPorcentCreateDto)
  porcents: IInflowPorcent[];
}
