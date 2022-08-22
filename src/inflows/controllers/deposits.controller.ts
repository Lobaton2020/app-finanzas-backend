import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';
import inflowsRouter from '../inflows.router';
import { DepositsService } from '../services/deposits.service';

@ApiBearerAuth()
@Controller(inflowsRouter.deposits.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class DepositsController {
  constructor(private readonly depositService: DepositsService) {}

  @Get()
  @AccessAdminOrUser()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination) {
    return this.depositService.findAll(req.user.userId, pagination);
  }

  @Get(':id')
  @AccessAdminOrUser()
  findOne(@Req() req, @Param('id') id: number) {
    return this.depositService.findOne(req.user.userId, id);
  }

  @Post()
  @AccessAdminOrUser()
  create(@Req() req, @Body() createInflowsTypeDto: CreateDepositDto) {
    return this.depositService.create(req.user.userId, createInflowsTypeDto);
  }
  @Put(':id')
  @AccessAdminOrUser()
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateInflowTypeDto: UpdateDepositDto,
  ) {
    return this.depositService.update(req.user.userId, id, updateInflowTypeDto);
  }
}
