import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tap } from 'rxjs';
import { Traceability } from 'src/common/entities/Traceability.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'
@Injectable()
export class TraceabilityInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TraceabilityInterceptor.name)
  constructor(
     @InjectRepository(Traceability) private readonly traceabilityRepository : Repository<Traceability>,
  ){}
  private buildBodyCreate(req, requestId){
    return {
      requestId: requestId,
      method: req.method,
      url: req.url,
      body: this.parseToString(req.body),
      reqHeaders: this.parseToString(req.headers),
      clientIp: req.ip || '',
      user: req.user || null
    }
  }

  private buildBodyUpdate(res, body){
    return {
      statusCode: res.statusCode,
      resHeaders: this.parseToString(res.getHeaders()),
      bodyResponse: this.parseToString(body),
      updatedAt: new Date().toISOString(),
    }
  }
  private parseToString(json): string{
    if(typeof(json) == "string") return json;
    if(typeof(json) == "object") return JSON.stringify(json);
    return "";
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const requestId:string = uuid();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    res.removeHeader("x-powered-by");
    try{
      res.setHeader("request-id",requestId);
      await this.traceabilityRepository.save(this.buildBodyCreate(req, requestId))
      return next.handle().pipe(tap( async (data)=> await this.traceabilityRepository.update({ requestId }, this.buildBodyUpdate(res,data))));
    }catch(e){
      this.logger.error("Failed to execute traceability",e)
      return next.handle();
    }
  }
}
