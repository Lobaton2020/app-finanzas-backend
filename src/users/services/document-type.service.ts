import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from '../entities/DocumentType.entity';

@Injectable()
export class DocumentTypeService {
    constructor(
        @InjectRepository(DocumentType) private readonly documentTypeRepository: Repository<DocumentType>
    ){}

    async finAll(){
        return await this.documentTypeRepository.find();
    }

    async findOne(id:number){
        return await this.documentTypeRepository.findOne(id);
    }
}
