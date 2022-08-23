import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateOutflowTypeDto } from '../dto/create-outflow-type.dto';
import { UpdateOutflowTypeDto } from '../dto/update-outflow-type';
import outflowsRouter from '../outflows.router';
import { OutflowTypeService } from '../services/outflow-type.service';

@ApiBearerAuth()
@Controller(outflowsRouter.outflowType.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OutflowsTypeController {
    constructor(
        private readonly outflowTypeService: OutflowTypeService
    ){}


  @Get()
  @AccessAdminOrUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination) {
    return this.outflowTypeService.findAll(req.user.userId, pagination)
  }

  @Post()
  @AccessAdminOrUser()
  create(@Req() req, @Body() createInflowsTypeDto: CreateOutflowTypeDto) {
    return this.outflowTypeService.create(req.user.userId, createInflowsTypeDto);
  }

  @Get(':id')
  @AccessAdminOrUser()
  findOne(@Req() req, @Param('id') id: number) {
    return this.outflowTypeService.findOne(req.user.userId, id);
  }

  @Put(':id')
  @AccessAdminOrUser()
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateInflowTypeDto: UpdateOutflowTypeDto,
  ) {
    return this.outflowTypeService.update(
      req.user.userId,
      id,
      updateInflowTypeDto,
    );
  }
}
