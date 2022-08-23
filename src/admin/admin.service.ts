import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Traceability } from 'src/common/entities/Traceability.entity';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Traceability)
    private readonly trackingRepository: Repository<Traceability>,
    private readonly paginationService: PaginationService,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
  async getTracking(page: IPagination) {
   const opts = {
      order: {
        createdAt: 'DESC',
      },
      select: [
        'requestId',
        'method',
        'body',
        'clientIp',
        'url',
        'reqHeaders',
        'resHeaders',
        'bodyResponse',
        'statusCode',
        'user',
        'createdAt',
        'updatedAt',
        'id',
      ],
    };
    return this.paginationService.paginate(this.trackingRepository,page, opts)
  }
}
