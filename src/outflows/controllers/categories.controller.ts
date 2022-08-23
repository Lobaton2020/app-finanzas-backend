import {
  Controller,
  Get,
  Req,
  Query,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import outflowsRouter from '../outflows.router';
import { CategoriesService } from '../services/categories.service';

@ApiBearerAuth()
@Controller(outflowsRouter.categories.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  @AccessAdminOrUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination) {
    return this.categoryService.findAll(req.user.userId, pagination);
  }

  @Get(':id')
  @AccessAdminOrUser()
  findOne(@Req() req, @Param('id') id: number) {
    return this.categoryService.findOne(req.user.userId, id);
  }

  @Post()
  @AccessAdminOrUser()
  create(@Req() req, @Body() createInflowsTypeDto: CreateCategoryDto) {
    return this.categoryService.create(req.user.userId, createInflowsTypeDto);
  }

  @Put(':id')
  @AccessAdminOrUser()
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(
      req.user.userId,
      id,
      updateCategoryDto,
    );
  }
}
