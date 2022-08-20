import { Injectable } from '@nestjs/common';
import { CreateOutflowDto } from '../dto/create-outflow.dto';
import { UpdateOutflowDto } from '../dto/update-outflow.dto';

@Injectable()
export class OutflowsService {

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
