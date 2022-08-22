import { Body, Controller, Get, Param, ParseIntPipe, Patch, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AccessAdmin, AccessAdminAndUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import UpdateUserStateDto from '../dto/update-user-status.dto';
import { User } from '../entities/User.entity';
import { UsersService } from '../services/users.service';
import usersRouter from '../users.router';

@Controller(usersRouter.users.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AccessAdminAndUser()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @AccessAdmin()
  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
  ) {
    return this.usersService.find(pagination);
  }

  @Put(':id')
  updateProfile(@Body() user: User): Promise<User> {
    return this.usersService.update(user);
  }

  @AccessAdminAndUser()
  @Patch(':id')
  changeStatus(
    @Param('id', ParseIntPipe) id,
    @Body() change: UpdateUserStateDto,
  ): Promise<User> {
    return this.usersService.changeStatus(id, change.status);
  }

  @AccessAdminAndUser()
  @Patch()
  @ApiOperation({
    summary:
      'Disable the user, with the id in the Token. Is like: Delete my account',
  })
  disablePersonal(@Req() req): Promise<User> {
    return this.usersService.changeStatus(req.user.id, false);
  }
}
