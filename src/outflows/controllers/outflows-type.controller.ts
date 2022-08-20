import { Controller } from '@nestjs/common';
import outflowsRouter from '../outflows.router';

@Controller(outflowsRouter.outflowType.path)
export class OutflowsTypeController {}
