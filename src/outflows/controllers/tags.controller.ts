import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import outflowsRouter from '../outflows.router';
import { TagsService } from '../services/tags.service';

@ApiBearerAuth()
@Controller(outflowsRouter.tags.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
  @Post()
  create() {
    return this.tagsService.create();
  }
}
