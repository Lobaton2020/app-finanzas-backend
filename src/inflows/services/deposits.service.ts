import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/services/pagination.service';
import {
  IPagination,
} from 'src/common/interfaces/pagination.interface';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';
import { Deposit } from '../entities/Deposit.entity';

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(userId, page: IPagination) {
    return this.paginationService.paginate(
      this.depositRepository,
      page as IPaginationOptions,
      { where: { user: userId } },
    );
  }
  async findOne(userId, id: number) {
    const result = await this.depositRepository.findOne({
      where: { user: userId, id },
    });
    if (!result) {
      throw new NotFoundException(`Deposit with id ${id} not found`);
    }
    return result;
  }
  async create(userId: number, createDepositDto: CreateDepositDto) {
    const alreadyByName = await this.depositRepository.findOne({
      where: { user: userId, name: createDepositDto.name },
    });
    if (alreadyByName) {
      throw new NotFoundException(`Deposit name already exists`);
    }
    const deposit = this.depositRepository.create(createDepositDto);
    deposit.user = await this.userService.findOne(userId);
    const newDeposit = await this.depositRepository.save(deposit);
    delete newDeposit.user;
    return newDeposit;
  }

  async update(userId: number, id: number, updateDepositDto: UpdateDepositDto) {
    const deposit = await this.findOne(userId, id);
    deposit.name = updateDepositDto.name;
    return await this.depositRepository.save(deposit);
  }
}
