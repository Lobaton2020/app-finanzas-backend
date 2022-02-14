import { ArgumentMetadata, ForbiddenException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defaultPagination } from 'src/config/app.config';

@Injectable()
export class PaginationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    const defaultValue = defaultPagination;
    try{
      const take = Number(value?.take);
      const skip = Number(value?.skip);
    if(isNaN(take) || isNaN(skip)){
        throw new ForbiddenException('The query param \'take\' or \'skip\' to paginate are invalid');
      }
      if(take > defaultValue.take){
        throw new ForbiddenException('Take value is too big');
      }
      return { take, skip };
    }catch(error){
      new Logger(PaginationPipe.name).error(error);
      throw new ForbiddenException(error.message);
    }
  }
}