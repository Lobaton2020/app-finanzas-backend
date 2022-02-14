import { Repository } from 'typeorm';
import {  Injectable } from '@nestjs/common';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { CrateRolDto } from '../dto/crate-rol.dto';
import { Rol } from '../entities/Rol.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolsService {
    constructor(
        @InjectRepository(Rol) private readonly rolsRepository: Repository<Rol>
        ) {}

    async create(createRolDto: CrateRolDto): Promise<Rol> {
        return await this.rolsRepository.save(createRolDto);
    }
    async findAll(page: Pagination): Promise<Rol[]> {
        return await this.rolsRepository.find({ ...page });
    }
}
