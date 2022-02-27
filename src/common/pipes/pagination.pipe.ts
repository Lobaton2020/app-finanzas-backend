import { ArgumentMetadata, ForbiddenException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defaultPagination } from 'src/config/app.config';

@Injectable()
export class PaginationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    const defaultValue = defaultPagination;
    try{
      const take = Number(value?.take) || defaultValue.take;
      const skip = Number(value?.skip) || defaultValue.skip;
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