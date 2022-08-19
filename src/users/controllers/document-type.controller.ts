import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/public.decorator';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { DocumentTypeService } from '../services/document-type.service';

@Controller('documentTypes')
@UseGuards(JwtAuthGuard,RolesGuard)
export class DocumentTypeController {
    constructor(
        private readonly documentTypeService: DocumentTypeService
    ){}

    @Get()
    @Public()
    findAll(@Query(PaginationPipe) pagination: Pagination){
        return this.documentTypeService.findAll(pagination)
    }
}
