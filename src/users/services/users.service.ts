import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/User.entity';
import { DocumentTypeService } from './document-type.service';
import { RolsService } from './rols.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly rolService: RolsService,
        private readonly documentTypeService: DocumentTypeService
    ) { }
    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ email },{ select:["password", "id", "completeName", "email"],
        relations:["rol", "documentType"] });
        if(user) return user;
        return null;
    }

    async findOne(id): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async find(pagination: Pagination): Promise<User[]> {
        return await this.userRepository.find({...pagination});
    }

    async create( user: CreateUserDto): Promise<User> {
        const rol = await this.rolService.findOne(+user.rolId)
        const documentType = await  this.documentTypeService.findOne(+user.documentTypeId)
        if(!rol) throw new BadRequestException('Rol not found')
        if(!documentType) throw new BadRequestException('Document type not found')
        const newUser =  await this.userRepository.create(user);
        newUser.rol = rol;
        newUser.documentType = documentType;
        return await this.userRepository.save(newUser);
    }
}
