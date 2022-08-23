import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateInflowTypeDto } from '../dto/create-inflow-type.dto';
import { UpadateInflowTypeDto } from '../dto/update-inflow-type.dto';
import { InflowType } from '../entities/IntflowType.entity';

@Injectable()
export class InflowsTypeService {
  constructor(
    @InjectRepository(InflowType)
    private readonly inflowsTypeRepository: Repository<InflowType>,
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
  ) {}

  findAll(userId, page: IPagination) {
    return this.paginationService.paginate(
      this.inflowsTypeRepository,
      page,
      { where: { user: userId } },
    );
  }

  async findOne(userId, id: number) {
    const result = await this.inflowsTypeRepository.findOne({
      where: { user: userId, id },
    });
    if (!result) {
      throw new NotFoundException(`InflowType with id ${id} not found`);
    }
    return result;
  }

  async create(userId: number, createInflowsTypeDto: CreateInflowTypeDto) {
    const alreadyByName = await this.inflowsTypeRepository.findOne({
      where: { user: userId, name: createInflowsTypeDto.name },
    });
    if (alreadyByName) {
      throw new BadRequestException(`InflowType name already exists`);
    }
    const inflowType = this.inflowsTypeRepository.create(createInflowsTypeDto);
    inflowType.user = await this.userService.findOne(userId);
    const newInflowType = await this.inflowsTypeRepository.save(inflowType);
    delete newInflowType.user;
    return newInflowType;
  }

  async update(
    userId: number,
    id: number,
    updateInflowTypeDto: UpadateInflowTypeDto,
  ) {
    const inflowType = await this.findOne(userId, id);
    inflowType.name = updateInflowTypeDto.name;
    return this.inflowsTypeRepository.save(inflowType);
  }
}
