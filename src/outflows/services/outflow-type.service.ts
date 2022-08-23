import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateOutflowTypeDto } from '../dto/create-outflow-type.dto';
import { UpdateOutflowTypeDto } from '../dto/update-outflow-type';
import { OutflowType } from '../entities/OutflowType.entity';

@Injectable()
export class OutflowTypeService {
  private readonly logger: Logger = new Logger(OutflowTypeService.name);
  constructor(
    @InjectRepository(OutflowType)
    private readonly outflowTypeRepository: Repository<OutflowType>,
    private readonly paginationService: PaginationService,
    private readonly userService: UsersService,
  ) {}
  async findOne(userId: number, outflowTypeId: number): Promise<any> {
    const record = await this.outflowTypeRepository.findOne({
      where: { user: userId, id: outflowTypeId },
    });

    if(!record){
      throw new NotFoundException("The record by id: "+outflowTypeId+" hasn't found")
    }
    return record
  }

  async findAll(userId: number, pagination: IPagination) {
    return this.paginationService.paginate(
      this.outflowTypeRepository,
      pagination,
      { where: { user: userId } },
    );
  }

  async create(userId: number, outflowTypeDto: CreateOutflowTypeDto) {
    const alreadyByName = await this.outflowTypeRepository.findOne({
      where: { user: userId, name: outflowTypeDto.name },
    });
    if (alreadyByName) {
      throw new BadRequestException(
        'The name of the outflowType already exists',
      );
    }
    try {
      const outflowTypeSave = this.outflowTypeRepository.create(outflowTypeDto);
      outflowTypeSave.user = await this.userService.findOne(userId);
      const outflowType = await this.outflowTypeRepository.save(
        outflowTypeSave,
      );
      delete outflowType.user;
      return outflowType;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Transaction failed');
    }
  }

  async update(userId: number, id: number, updateInflowTypeDto: UpdateOutflowTypeDto) {

    const alreadyByName = await this.outflowTypeRepository.findOne({
      where: { user: userId, name: updateInflowTypeDto.name },
    });
    const inflowType = await this.findOne(userId, id);
    if (!inflowType) {
      throw new BadRequestException('The inflowType doesn\'t exist');
    }
    if(alreadyByName && alreadyByName.name != inflowType.name){
      throw new BadRequestException('The name of the inflowType already exists, choose another');
    }
    return this.outflowTypeRepository.save({ ...inflowType, ...updateInflowTypeDto })

  }
}
