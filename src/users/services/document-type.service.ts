import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { Repository } from 'typeorm';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { DocumentType } from '../entities/DocumentType.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
    private readonly paginationService: PaginationService,
  ) {}

  findAll(pagination: IPagination): Promise<Pagination<DocumentType, IPaginationMeta>> {
    return this.paginationService.paginate<DocumentType>(
      this.documentTypeRepository,
      pagination,
    );
  }

  findOne(id: number) {
    return this.documentTypeRepository.findOne(id);
  }
}
