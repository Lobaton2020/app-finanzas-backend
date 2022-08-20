import { Controller } from '@nestjs/common';
import outflowsRouter from '../outflows.router';

@Controller(outflowsRouter.categories.path)
export class CategoriesController {}
