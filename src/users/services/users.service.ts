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
        const user = await this.userRepository.findOne({ email },{ select:["password", "id", "completeName", "email", "status"],
        relations:["rol", "documentType"] });
        if(user) return user;
        return null;
    }

    async findOne(id): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findOneForRefreshToekn(id): Promise<User> {
        return await this.userRepository.findOne({ id },{
            select:["password", "id", "completeName", "email", "status"],
            relations:["rol", "documentType"]
        });
    }

    async find(pagination: Pagination): Promise<User[]> {
        return await this.userRepository.find({...pagination});
    }

    async create( user: CreateUserDto): Promise<User> {
        const rol = await this.rolService.findOne(+user.rolId)
        if(!rol) throw new BadRequestException('Rol not found')
        const documentType = await  this.documentTypeService.findOne(+user.documentTypeId)
        if(!documentType) throw new BadRequestException('Document type not found')
        const alreadyExistByDocument = await  this.userRepository.findOne({ documentNumber: user.documentNumber });
        if(alreadyExistByDocument) throw new BadRequestException('Document already exist, please try with other documentNumber')
        const alreadyExistByEmail = await  this.userRepository.findOne({ email: user.email });
        if(alreadyExistByEmail) throw new BadRequestException('Email already exist, please try with other email')
        const newUser =  await this.userRepository.create(user);
        newUser.rol = rol;
        newUser.documentType = documentType;
        return await this.userRepository.save(newUser);
    }
    async changeStatus(id: number, status:boolean): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if(!user) throw new BadRequestException('User not found')
        user.status = status;
        await this.userRepository.update(user.id, { status: user.status });
        return user;
    }

    async update(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
