import { PartialType } from "@nestjs/mapped-types";
import { BaseStatusDto } from "src/common/dtos/BaseNameDto";

export class UpadateInflowTypeDto extends PartialType(BaseStatusDto) { }