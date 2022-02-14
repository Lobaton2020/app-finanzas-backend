import { PartialType } from "@nestjs/mapped-types";
import { BaseNameDto } from "src/common/dtos/BaseNameDto";

export class CrateRolDto extends PartialType(BaseNameDto) {}
