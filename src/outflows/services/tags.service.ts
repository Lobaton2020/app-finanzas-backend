import { Injectable, Logger, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../entities/Tag.entity';

@Injectable()
export class TagsService {

  private readonly logger: Logger = new Logger(TagsService.name);
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
  ) {}

  findAll(userId: number, pagination: IPagination) {
    return this.paginationService.paginate(
      this.tagsRepository,
      pagination,
      { where: { user: userId } },
    );
  }

  async findOne(userId: number, tagId: number) {
    const record = await this.tagsRepository.findOne({
      where: { user: userId, id: tagId },
    });
    if(!record){
      throw new NotFoundException("The tag by id: "+tagId+" hasn't found")
    }
    return record
  }

  async create(userId: number, createTagDto: CreateTagDto) {
    const alreadyByName = await this.tagsRepository.findOne({
      where: { user: userId, name: createTagDto.name },
    });
    if (alreadyByName) {
      throw new BadRequestException('The name of the tag already exists');
    }

    try {
      const tagSave = this.tagsRepository.create(createTagDto);
      tagSave.user = await this.userService.findOne(userId);
      const newtag = await this.tagsRepository.save(tagSave);
      delete newtag.user;
      return newtag;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Transaction failed');
    }
  }

  async update(userId: number, id: number, updatetagDto: UpdateTagDto) {

    const alreadyByName = await this.tagsRepository.findOne({
      where: { user: userId, name: updatetagDto.name },
    });
    const tag = await this.findOne(userId, id);
    if (!tag) {
      throw new BadRequestException('The tag doesn\'t exist');
    }
    if(alreadyByName && alreadyByName.name != tag.name){
      throw new BadRequestException('The name of the tag already exists, choose another');
    }

    return this.tagsRepository.save({ ...tag, ...updatetagDto })

  }
}
