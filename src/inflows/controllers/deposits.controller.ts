import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AccessAdminAndUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';
import { DepositsService } from '../services/deposits.service';

@Controller('deposits')
@UseGuards(JwtAuthGuard,RolesGuard)
export class DepositsController {
    constructor(
        private readonly depositService: DepositsService
    ){}
    @Get()
    @AccessAdminAndUser()
    findAll(@Req() req, @Query(PaginationPipe) pagination: Pagination){
        return this.depositService.findAll(req.user.userId, pagination);
    }

    @Get(":id")
    @AccessAdminAndUser()
    findOne(@Req() req, @Param('id') id: number){
        return this.depositService.findOne(req.user.userId, id);
    }

    @Post()
    @AccessAdminAndUser()
    create(@Req() req, @Body() createInflowsTypeDto: CreateDepositDto){
        return this.depositService.create(req.user.userId, createInflowsTypeDto);
    }
    @Put(":id")
    @AccessAdminAndUser()
    update(@Req() req,@Param("id") id:number, @Body() updateInflowTypeDto: UpdateDepositDto){
        return this.depositService.update(req.user.userId, id, updateInflowTypeDto);
    }
}
