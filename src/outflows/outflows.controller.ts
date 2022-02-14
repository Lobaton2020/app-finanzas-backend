import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OutflowsService } from './outflows.service';
import { CreateOutflowDto } from './dto/create-outflow.dto';
import { UpdateOutflowDto } from './dto/update-outflow.dto';

@Controller('outflows')
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
