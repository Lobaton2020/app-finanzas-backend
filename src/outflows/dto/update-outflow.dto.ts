import { PartialType } from '@nestjs/swagger';
import { CreateOutflowDto } from './create-outflow.dto';

export class UpdateOutflowDto extends PartialType(CreateOutflowDto) {}
