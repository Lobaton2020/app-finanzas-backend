import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, Query, UseGuards } from '@nestjs/common';
import { AccessAdminAndUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateInflowDto } from '../dto/create-inflow.dto';
import { UpdateInflowDto } from '../dto/update-inflow.dto';
import { InflowsService } from '../services/inflows.service';

@Controller('inflows')
@UseGuards(JwtAuthGuard,RolesGuard)
export class InflowsController {
  constructor(private readonly inflowsService: InflowsService) {}


  @Get()
  @AccessAdminAndUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: Pagination){
      return this.inflowsService.findAll(req.user.userId, pagination);
  }

  @Get(":id")
  @AccessAdminAndUser()
  findOne(@Req() req, @Param('id') id: number){
      return this.inflowsService.findOne(req.user.userId, id);
  }

  @Post()
  @AccessAdminAndUser()
  create(@Req() req,@Body() createInflowDto: CreateInflowDto) {
    return this.inflowsService.create(req.user.userId, createInflowDto);
  }

  @Put(':id')
  @AccessAdminAndUser()
  update(@Req() req, @Param('id') id: number, @Body() updateInflowDto: UpdateInflowDto) {
    return this.inflowsService.update(req.user.userId, id, updateInflowDto);
  }

}
