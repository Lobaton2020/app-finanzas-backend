import { Body, Controller, Get, Param, ParseIntPipe, Patch, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AccessAdmin, AccessAdminAndUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import UpdateUserStateDto from '../dto/update-user-status.dto';
import { User } from '../entities/User.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @AccessAdminAndUser()
    @Get(":id")
    async findOne(@Param("id",ParseIntPipe) id: number): Promise<User>{
        return await this.usersService.findOne(id);
    }

    // @AccessAdmin()
    @Get()
    async findAll(@Query(PaginationPipe) pagination: Pagination): Promise<User[]> {
        return await this.usersService.find(pagination);
    }

    @Put(":id")
    async updateProfile(@Body() user: User): Promise<User> {
        return await this.usersService.update(user);
    }


    @AccessAdminAndUser()// test
    // @AccessAdmin()
    @Patch(':id')
    async changeStatus(@Param("id",ParseIntPipe) id, @Body() change: UpdateUserStateDto): Promise<User> {
        return await this.usersService.changeStatus(id, change.status);
    }

    @AccessAdminAndUser()
    @Patch()
    @ApiOperation({ summary: 'Disable the user, with the id in the Token. Is like: Delete my account' })
    async disablePersonal(@Req() req): Promise<User> {
        return await this.usersService.changeStatus(req.user.id, false);
    }

}
