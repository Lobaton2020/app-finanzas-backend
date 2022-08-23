import { Controller, Get, Post, Body, Put, Param, UseGuards, Req, Query } from '@nestjs/common';
import { OutflowsService } from '../services/outflows.service';
import { CreateOutflowDto } from '../dto/create-outflow.dto';
import { UpdateOutflowDto } from '../dto/update-outflow.dto';
import outflowsRouter from '../outflows.router';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination } from 'src/common/interfaces/pagination.interface';

@ApiBearerAuth()
@Controller(outflowsRouter.outflows.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OutflowsController {
  constructor(private readonly outflowsService: OutflowsService) {}

  @Get()
  @AccessAdminOrUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination) {
    return this.outflowsService.findAll(req.user.userId, pagination);
  }

  @Get(':id')
  @AccessAdminOrUser()
  findOne(@Req() req, @Param('id') id: number) {
    return this.outflowsService.findOne(req.user.userId, id);
  }

  @Post()
  @AccessAdminOrUser()
  create(@Req() req, @Body() createOutflowDto: CreateOutflowDto) {
    return this.outflowsService.create(req.user.userId, createOutflowDto);
  }

  @Put(':id')
  @AccessAdminOrUser()
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateOutflowDto: UpdateOutflowDto,
  ) {
    return this.outflowsService.update(req.user.userId, id, updateOutflowDto);
  }
}
