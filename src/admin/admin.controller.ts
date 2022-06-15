import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AccessAdmin } from 'src/auth/decorators/role.decorator';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @AccessAdmin()
  @Get("tracking")
  tracking(@Query(PaginationPipe) pagination: Pagination) {
    return this.adminService.getTracking(pagination);
  }
}
