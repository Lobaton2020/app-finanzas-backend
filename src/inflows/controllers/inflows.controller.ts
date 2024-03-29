import { Controller, Get, Post, Body, Param, Put, Req, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/public.decorator';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateInflowDto } from '../dto/create-inflow.dto';
import { UpdateInflowDto } from '../dto/update-inflow.dto';
import inflowsRouter from '../inflows.router';
import { InflowsService } from '../services/inflows.service';

@ApiTags('inflows')
@ApiBearerAuth()
@Controller(inflowsRouter.inflows.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class InflowsController {
  constructor(private readonly inflowsService: InflowsService) {}

  @Get()
  @AccessAdminOrUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination) {
    return this.inflowsService.findAll(req.user.userId, pagination);
  }

  @Get(':id')
  @AccessAdminOrUser()
  findOne(@Req() req, @Param('id') id: number) {
    return this.inflowsService.findOne(req.user.userId, id);
  }

  @Post()
  @AccessAdminOrUser()
  create(@Req() req, @Body() createInflowDto: CreateInflowDto) {
    return this.inflowsService.create(req.user.userId, createInflowDto);
  }

  @Put(':id')
  @AccessAdminOrUser()
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateInflowDto: UpdateInflowDto,
  ) {
    return this.inflowsService.update(req.user.userId, id, updateInflowDto);
  }
}
