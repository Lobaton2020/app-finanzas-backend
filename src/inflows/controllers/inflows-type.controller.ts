import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AccessAdminAndUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CreateInflowTypeDto } from '../dto/create-inflow-type.dto';
import { UpadateInflowTypeDto } from '../dto/update-inflow-type.dto';
import { InflowsTypeService } from '../services/inflows-type.service';

@Controller('inflowsTypes')
@UseGuards(JwtAuthGuard,RolesGuard)
export class InflowsTypeController {
    constructor(
        private readonly inflowsTypeService: InflowsTypeService
    ){}

    @Get()
    @AccessAdminAndUser()
    findAll(@Req() req, @Query(PaginationPipe) pagination: Pagination){
        return this.inflowsTypeService.findAll(req.user.userId, pagination);
    }

    @Get(":id")
    findOne(@Req() req, @Param('id') id: number){
        return this.inflowsTypeService.findOne(req.user.userId, id);
    }

    @Post()
    @AccessAdminAndUser()
    create(@Req() req, @Body() createInflowsTypeDto: CreateInflowTypeDto){
        return this.inflowsTypeService.create(req.user.userId, createInflowsTypeDto);
    }
    @Put(":id")
    @AccessAdminAndUser()
    update(@Req() req,@Param("id") id:number, @Body() updateInflowTypeDto: UpadateInflowTypeDto){
        return this.inflowsTypeService.update(req.user.userId, id, updateInflowTypeDto);
    }
}
