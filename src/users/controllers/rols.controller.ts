import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { CrateRolDto } from '../dto/crate-rol.dto';
import { RolsService } from '../services/rols.service';

@Controller('rols')
export class RolsController {
    private readonly logger = new Logger(RolsController.name);
    constructor(
        private readonly rolsService: RolsService,
    ) {

    }
        @Post()
        create(@Body() createRolDto : CrateRolDto): Promise<any> {
            this.logger.log("Create a new rol");
            return this.rolsService.create(createRolDto);
        }

        @Get()
        findAll(@Query(PaginationPipe) pagination: Pagination): Promise<any> {
            this.logger.log("Get all rols");
            return this.rolsService.findAll(pagination);
        }
    }
