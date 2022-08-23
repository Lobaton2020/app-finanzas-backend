import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import outflowsRouter from '../outflows.router';
import { TagsService } from '../services/tags.service';

@ApiBearerAuth()
@Controller(outflowsRouter.tags.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @AccessAdminOrUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination) {
    return this.tagsService.findAll(req.user.userId, pagination);
  }

  @Get(':id')
  @AccessAdminOrUser()
  findOne(@Req() req, @Param('id') id: number) {
    return this.tagsService.findOne(req.user.userId, id);
  }

  @Post()
  @AccessAdminOrUser()
  create(@Req() req, @Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(req.user.userId, createTagDto);
  }

  @Put(':id')
  @AccessAdminOrUser()
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(
      req.user.userId,
      id,
      updateTagDto,
    );
  }
}
