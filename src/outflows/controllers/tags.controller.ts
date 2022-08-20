import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import outflowsRouter from '../outflows.router';
import { TagsService } from '../services/tags.service';

@Controller(outflowsRouter.tags.path)
export class TagsController {
    constructor(
        private readonly tagsService: TagsService,
    ){}
    @Get()
    findAll(){
        return this.tagsService.findAll()
    }
    @Post()
    create(){
        return this.tagsService.create()
    }
}
