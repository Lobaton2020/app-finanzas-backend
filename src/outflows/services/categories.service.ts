import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/Category.entity';
import { OutflowTypeService } from './outflow-type.service';

@Injectable()
export class CategoriesService {
  private readonly logger: Logger = new Logger(CategoriesService.name);
  constructor(
    private readonly paginationService: PaginationService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly outflowTypeService: OutflowTypeService,
    private readonly userService: UsersService,
  ) {}
  findAll(userId: number, pagination: IPagination) {
    return this.paginationService.paginate(
      this.categoryRepository,
      pagination,
      { where: { user: userId } },
    );
  }

  async findOne(userId: number, categoryId: number) {
    const record = await this.categoryRepository.findOne({
      where: { user: userId, id: categoryId },
    });
    if(!record){
      throw new NotFoundException("The record by id: "+categoryId+" hasn't found")
    }
    return record
  }

  async create(userId: number, category: CreateCategoryDto) {
    const alreadyByName = await this.categoryRepository.findOne({
      where: { user: userId, name: category.name },
    });
    if (alreadyByName) {
      throw new BadRequestException('The name of the category already exists');
    }
    const outflowType = await this.outflowTypeService.findOne(
      userId,
      category.outflowTypeId,
    );
    if (!outflowType) {
      throw new BadRequestException("The outflowTypeId id doesn't exist.");
    }

    try {
      const categorySave = this.categoryRepository.create(category);
      categorySave.user = await this.userService.findOne(userId);
      categorySave.outflowtype = outflowType;
      const newCategory = await this.categoryRepository.save(categorySave);
      delete newCategory.user;
      return newCategory;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Transaction failed');
    }
  }

  async update(userId: number, id: number, updateCategoryDto: UpdateCategoryDto) {

    const outflowType = await this.outflowTypeService.findOne(
      userId,
      updateCategoryDto.outflowTypeId,
    );

    if (!outflowType) {
      throw new BadRequestException("The outflowTypeId id doesn't exist.");
    }

    const alreadyByName = await this.categoryRepository.findOne({
      where: { user: userId, name: updateCategoryDto.name },
    });
    const category = await this.findOne(userId, id);
    if (!category) {
      throw new BadRequestException('The category doesn\'t exist');
    }
    if(alreadyByName && alreadyByName.name != category.name){
      throw new BadRequestException('The name of the category already exists, choose another');
    }

    return this.categoryRepository.save({ ...category, ...updateCategoryDto })

  }
}
