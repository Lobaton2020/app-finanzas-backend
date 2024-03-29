import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/User.entity';
import { DocumentTypeService } from './document-type.service';
import { RolsService } from './rols.service';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { PaginationService } from 'src/common/services/pagination.service';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolService: RolsService,
    private readonly documentTypeService: DocumentTypeService,
    private readonly paginationService: PaginationService,
  ) {}
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { email },
      {
        select: ['password', 'id', 'completeName', 'email', 'status'],
        relations: ['rol', 'documentType'],
      },
    );
    if (user) return user;
    return null;
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneForRefreshToekn(id): Promise<User> {
    return await this.userRepository.findOne(
      { id },
      {
        select: ['password', 'id', 'completeName', 'email', 'status'],
        relations: ['rol', 'documentType'],
      },
    );
  }

  find(pagination: IPagination): Promise<Pagination<User, IPaginationMeta>> {
    return this.paginationService.paginate<User>(
      this.userRepository,
      pagination,
    );
  }

  async create(user: CreateUserDto): Promise<User> {
    const rol = await this.rolService.findOneByName(Role.USER); // by default the rol is USER
    if (!rol) throw new BadRequestException('Rol not found');
    const alreadyExistByEmail = await this.userRepository.findOne({
      email: user.email,
    });
    if (alreadyExistByEmail)
      throw new BadRequestException(
        'Email already exist, please try with other email',
      );
    const newUser = await this.userRepository.create(user);
    newUser.rol = rol;
    return await this.userRepository.save(newUser);
  }
  async changeStatus(id: number, status: boolean): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException('User not found');
    user.status = status;
    await this.userRepository.update(user.id, { status: user.status });
    return user;
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
