import { PartialType } from '@nestjs/swagger';
import { CreateInflowDto } from './create-inflow.dto';

export class UpdateInflowDto extends PartialType(CreateInflowDto) {}
