import { Injectable } from '@nestjs/common';

@Injectable()
export class OutflowTypeService {
    // async find(pag:IPagination,userId:number){
    //     this.logger.info("Se consultan datos desde el repositorio de outflow type")
    //     return await this.OutflowType.find({...pag, where: { user: userId }});
    // }

    // async create(outflowType:OutflowTypeCreateDto){

    //     const user =  await this.User.findOne({ id: outflowType.userId });
    //     if(!user){
    //         throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
    //     }

    //     if(await this.OutflowType.findOne({ name:outflowType.name })){
    //         throw new ValidateException(Code.BAD_REQUEST,"The Outflow Type already exists")
    //     }

    //     try{
    //         const dataSave = this.OutflowType.create(outflowType)
    //         dataSave.user = user
    //         this.logger.info("Se crear registro repositorio de tipo de salida")
    //         const newData = await this.OutflowType.save(dataSave);
    //         delete newData.user;
    //         return newData;
    //     }catch(error){
    //         this.logger.error(error)
    //         throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
    //     }
    // }
}
