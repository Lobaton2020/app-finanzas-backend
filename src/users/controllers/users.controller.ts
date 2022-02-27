import { Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { AccessAdmin, AccessAdminAndUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { User } from '../entities/User.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @AccessAdminAndUser()
    @Get(":id")
    async findOne(@Query("id",ParseIntPipe) id: number, @Req() user): Promise<User>{
        console.log(user)
        return await this.usersService.findOne(id);
    }

    @AccessAdmin()
    @Get()
    async findAll(@Query(PaginationPipe) pagination: Pagination): Promise<User[]> {
        return await this.usersService.find(pagination);
    }


}
