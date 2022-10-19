import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNumber()
  porcent: number;

  @ApiProperty()
  @IsNumber()
  depositId: number;
}

export class CreateInflowDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  inflowTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  setDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => InflowPorcentCreateDto)
  porcents: IInflowPorcent[];
}
