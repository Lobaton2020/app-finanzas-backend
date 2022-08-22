import { Injectable } from '@nestjs/common';
import { CreateOutflowDto } from '../dto/create-outflow.dto';
import { UpdateOutflowDto } from '../dto/update-outflow.dto';

@Injectable()
export class OutflowsService {


//   async find(pag:IPagination,userId:number){
//     this.logger.info("Se consultan datos desde el repositorio de outflows")
//     const opts = {
//         ...pag,
//         relations:["category","user","deposit","outflowtype"],
//         where:{ user:userId }
//     };
//     return await this.Outflow.find(opts);
// }

// async create(outflow:OutflowCreateDto){

//     const { userId, outflowTypeId,categoryId, depositId } = outflow;
//     const user = await this.User.findOne(userId);
//     if(!user){
//         throw new ValidateException(Code.BAD_REQUEST,"The user not exist")
//     }
//     const outflowType = await this.OutflowType.findOne(outflowTypeId)
//     if(!outflowType){
//         throw new ValidateException(Code.BAD_REQUEST,"The ouflowType not exist")
//     }

//     const category = await this.Category.findOne(categoryId);
//     if(!category){
//         throw new ValidateException(Code.BAD_REQUEST,"The category not exist")
//     }

//     const deposit = await this.Deposit.findOne(depositId);
//     if(!deposit){
//         throw new ValidateException(Code.BAD_REQUEST,"The deposit not exist")
//     }
//     if(!await this.isAmountDisponible(depositId, userId, outflow.amount)){
//         throw new ValidateException(Code.BAD_REQUEST,"You don't have sufficient money in this deposit")
//     }

//     try{
//         const outflowSave = this.Outflow.create(outflow)
//         outflowSave.user = user
//         outflowSave.outflowtype = outflowType
//         outflowSave.category = category
//         outflowSave.deposit = deposit
//         this.logger.info("Se crear registro repositorio de outflow")
//         return await this.Outflow.save(outflowSave);

//     }catch(error){
//         this.logger.error(error)
//         throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
//     }
// }
// private async isAmountDisponible(depositId:number,userId:number,amount:number):Promise<boolean>{
//     const { total:egressTotal } = (await this.reportRepository.getAllMoneyEgressByOneDeposit(depositId,userId))[0]
//     const { total:ingressTotal }  = (await this.reportRepository.getAllMoneyIngressByOneDeposit(depositId,userId))[0]
//     return (ingressTotal - egressTotal) > amount;
// }

  create(createOutflowDto: CreateOutflowDto) {
    return 'This action adds a new outflow';
  }

  findAll() {
    return `This action returns all outflows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} outflow`;
  }

  update(id: number, updateOutflowDto: UpdateOutflowDto) {
    return `This action updates a #${id} outflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} outflow`;
  }
}
