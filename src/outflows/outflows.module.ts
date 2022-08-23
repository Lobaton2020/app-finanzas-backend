import { Module } from '@nestjs/common';
import { OutflowsController } from './controllers/outflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from 'src/inflows/entities/Deposit.entity';
import { OutflowsTypeController } from './controllers/outflows-type.controller';
import { TagsController } from './controllers/tags.controller';
import { CategoriesController } from './controllers/categories.controller';
import { Outflow } from './entities/Outflow.entity';
import { OutflowType } from './entities/OutflowType.entity';
import { Category } from './entities/Category.entity';
import { Tag } from './entities/Tag.entity';
import { TagsService } from './services/tags.service';
import { OutflowsService } from './services/outflows.service';
import { OutflowTypeService } from './services/outflow-type.service';
import { CategoriesService } from './services/categories.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Outflow, OutflowType, Category, Deposit, Tag]),
  ],
  controllers: [
    OutflowsTypeController,
    TagsController,
    CategoriesController,
    OutflowsController,
  ],
  providers: [
    OutflowsService,
    TagsService,
    CategoriesService,
    OutflowTypeService,
    PaginationService,
  ],
})
export class OutflowsModule {}
