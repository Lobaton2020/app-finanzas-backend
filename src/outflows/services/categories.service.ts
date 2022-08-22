import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category.entity';

@Injectable()
export class CategoriesService {
    private readonly logger:Logger = new Logger(CategoriesService.name);
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ){}
    // async find(pag:IPagination,userId:number){
    //     this.logger.info("Se consultan datos desde el repositorio de user")
    //     return await this.Category.find({ ...pag, where:{ user:userId } });
    // }

    // async create(category:CategoryCreate){

    //     const user =  await this.User.findOne({ id:category.userId });
    //     if(!user){
    //         throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
    //     }
    //     if(await this.Category.findOne({ name: category.name })){
    //         throw new ValidateException(Code.BAD_REQUEST,"The category already exists")
    //     }

    //     const outflowType = await this.OutflowType.findOne({ id: category.outflowTypeId })
    //     if(!outflowType){
    //         throw new ValidateException(Code.BAD_REQUEST,"The 'outflowTypeId' is invalid")
    //     }

    //     try{
    //         const categorySave = this.Category.create(category)
    //         categorySave.user = user
    //         categorySave.outflowtype = outflowType
    //         this.logger.info("Se crear registro repositorio de category")
    //         const newData =  await this.Category.save(categorySave);
    //         delete newData.user;
    //         return newData;


    //     }catch(error){
    //         this.logger.error(error)
    //         throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
    //     }
    // }
}
