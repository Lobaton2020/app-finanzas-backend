import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { Repository } from 'typeorm';
import { Tag } from '../entities/Tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagsRepository.find();
  }
  create(){
    const tag = new Tag()
    tag.name = "domingo feliz"
    const u = new User()
    u.id = 1
    tag.user = u
    return this.tagsRepository.save(tag)
  }
}
