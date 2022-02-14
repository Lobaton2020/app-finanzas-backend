import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { IAppConfig } from './config/app.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { DATABASE_CONFG, DEV_KEY, HTTP_PORT } from './config/constants.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configForDevDatabase = ()=>{
  const data = require("./config/database.config").default();
  require("fs").writeFileSync("ormconfig.json", JSON.stringify(data,null,4));
}

async function bootstrap() {
  if(process.env.NODE_ENV === DEV_KEY) configForDevDatabase();
  const app = await NestFactory.create(AppModule);
  const config = app.get<IAppConfig>(ConfigService);

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
