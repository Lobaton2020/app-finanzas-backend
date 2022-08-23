import { Injectable, Inject, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { DepositsService } from 'src/inflows/services/deposits.service';
import { ReportsService } from 'src/reports/services/reports.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateOutflowDto } from '../dto/create-outflow.dto';
import { UpdateOutflowDto } from '../dto/update-outflow.dto';
import { Outflow } from '../entities/Outflow.entity';
import { IReportService } from '../interfaces/report.interface';
import { CategoriesService } from './categories.service';
import { OutflowTypeService } from './outflow-type.service';
import { TagsService } from './tags.service';

@Injectable()
export class OutflowsService {
  private readonly logger: Logger = new Logger(OutflowsService.name);
  constructor(
    @InjectRepository(Outflow) private readonly outflowsRepository: Repository<Outflow>,
    private readonly userService: UsersService,
    private readonly outflowTypeService: OutflowTypeService,
    private readonly categoryService: CategoriesService,
    private readonly depositService: DepositsService,
    private readonly paginationService: PaginationService,
    private readonly tagService: TagsService,
    @Inject(ReportsService.name)
    private readonly reportsService: IReportService
  ) {}
  findAll(userId: number, pagination: IPagination) {
    return this.paginationService.paginate(
      this.outflowsRepository,
      pagination,
      { where: { user: userId } },
    );
  }


async create(userId: number, createOutflowDto: CreateOutflowDto){

    const {outflowTypeId, categoryId, depositId, tagsId } = createOutflowDto;

    const outflowType = await this.outflowTypeService.findOne(userId, outflowTypeId)
    const category = await this.categoryService.findOne(userId, categoryId);
    const deposit = await this.depositService.findOne(userId, depositId);
    const tags = []
    for(let tagId of tagsId){
        tags.push(await this.tagService.findOne(userId, tagId))
    }

    if(!await this.reportsService.isQuantityAvailable(userId, depositId, createOutflowDto.amount)){
        throw new BadRequestException("You don't have enought money in this deposit.")
    }

    try{
        const outflowSave = this.outflowsRepository.create(createOutflowDto)
        outflowSave.user = await this.userService.findOne(userId);
        outflowSave.outflowtype = outflowType
        outflowSave.category = category
        outflowSave.deposit = deposit
        outflowSave.tags = tags
        return await this.outflowsRepository.save(outflowSave);
    }catch(error){
        this.logger.error(error)
        throw new InternalServerErrorException("Transaction failed")
    }
  }

  update(userId: any, id: number, updateOutflowDto: UpdateOutflowDto) {
    throw new Error('Method not implemented.');
  }
  findOne(userId: any, id: number) {
    throw new Error('Method not implemented.');
  }

}
