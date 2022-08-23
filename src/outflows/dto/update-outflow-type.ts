import { PartialType } from "@nestjs/mapped-types";
import { CreateOutflowTypeDto } from "./create-outflow-type.dto";

export class UpdateOutflowTypeDto extends PartialType(CreateOutflowTypeDto){}