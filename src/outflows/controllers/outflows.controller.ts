import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OutflowsService } from '../services/outflows.service';
import { CreateOutflowDto } from '../dto/create-outflow.dto';
import { UpdateOutflowDto } from '../dto/update-outflow.dto';
import outflowsRouter from '../outflows.router';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller(outflowsRouter.outflows.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OutflowsController {
  constructor(private readonly outflowsService: OutflowsService) {}

  @Post()
  create(@Body() createOutflowDto: CreateOutflowDto) {
    return this.outflowsService.create(createOutflowDto);
  }

  @Get()
  findAll() {
    return this.outflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outflowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutflowDto: UpdateOutflowDto) {
    return this.outflowsService.update(+id, updateOutflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outflowsService.remove(+id);
  }
}
