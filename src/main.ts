import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { IAppConfig } from './config/app.config';
import {  ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { DEV_KEY, HTTP_PORT } from './config/constants.config';
import { TimeInterceptor } from './common/interceptors/time.interceptor';

const configForDevDatabase = ()=>{
  const data = require("./config/database.config").default();
  require("fs").writeFileSync("ormconfig.json", JSON.stringify(data,null,4));
}

async function bootstrap() {
  let configApp = {};
  if(process.env.NODE_ENV === DEV_KEY) {
    configForDevDatabase()
    configApp = { cors: true };
  };
  const app = await NestFactory.create(AppModule, configApp);
  const config = app.get<IAppConfig>(ConfigService);
  if(process.env.NODE_ENV === DEV_KEY) app.useGlobalInterceptors(new TimeInterceptor());
  app.enableCors();
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes( new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Finanzas API")
    .setDescription("API para el manejo de finanzas")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
    SwaggerModule.setup("api/v1/docs", app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(config.get<number>(HTTP_PORT));
}
bootstrap();
