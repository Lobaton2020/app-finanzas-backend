import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateInflowDto } from '../dto/create-inflow.dto';
import { UpdateInflowDto } from '../dto/update-inflow.dto';
import { InflowsService } from '../services/inflows.service';

@Controller('inflows')
export class InflowsController {
  constructor(private readonly inflowsService: InflowsService) {}

  @Post()
  create(@Body() createInflowDto: CreateInflowDto) {
    return this.inflowsService.create(createInflowDto);
  }

  @Get()
  findAll() {
    return this.inflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inflowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInflowDto: UpdateInflowDto) {
    return this.inflowsService.update(+id, updateInflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inflowsService.remove(+id);
  }
}
