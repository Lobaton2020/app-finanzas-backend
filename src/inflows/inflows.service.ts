import { Injectable } from '@nestjs/common';
import { CreateInflowDto } from './dto/create-inflow.dto';
import { UpdateInflowDto } from './dto/update-inflow.dto';

@Injectable()
export class InflowsService {
  create(createInflowDto: CreateInflowDto) {
    return 'This action adds a new inflow';
  }

  findAll() {
    return `This action returns all inflows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inflow`;
  }

  update(id: number, updateInflowDto: UpdateInflowDto) {
    return `This action updates a #${id} inflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} inflow`;
  }
}
