import { Body, Controller, Get, Logger, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/public.decorator';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CrateRolDto } from '../dto/crate-rol.dto';
import { RolsService } from '../services/rols.service';

@Controller('rols')
@UseGuards(JwtAuthGuard,RolesGuard)
export class RolsController {
private readonly logger = new Logger(RolsController.name);
    constructor(
        private readonly rolsService: RolsService,
    ) {}

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createRolDto : CrateRolDto): Promise<any> {
        this.logger.log("Create a new rol");
        return this.rolsService.create(createRolDto);
    }
    @Get()
    // @Roles(Role.USER)
    @Public()
    findAll(@Query(PaginationPipe) pagination: Pagination): Promise<any> {
        this.logger.log("Get all rols");
        return this.rolsService.findAll(pagination);
    }
}
