import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { DocumentType } from '../entities/DocumentType.entity';

@Injectable()
export class DocumentTypeService {
    constructor(
        @InjectRepository(DocumentType) private readonly documentTypeRepository: Repository<DocumentType>
    ){}

    async findAll(pagination: Pagination): Promise<DocumentType[]> {
        return await this.documentTypeRepository.find({...pagination});
    }

    async findOne(id:number){
        return await this.documentTypeRepository.findOne(id);
    }
}
