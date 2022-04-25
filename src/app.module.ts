import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig, { jwtConfig } from './config/app.config';
import enviromentsEnv from './config/enviroments.config';
import envValidate from './config/env.validate';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { InflowsModule } from './inflows/inflows.module';
import { OutflowsModule } from './outflows/outflows.module';
import { ReportsModule } from './reports/reports.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DATABASE_CONFIG } from './config/constants.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceabilityInterceptor } from './common/interceptors/traceability.interceptor';
import { Traceability } from './common/entities/Traceability.entity';

const ConfigModuleProvider = ConfigModule.forRoot({
  envFilePath: enviromentsEnv[process.env.NODE_ENV] || '.env',
  isGlobal: true ,
  load: [ databaseConfig, appConfig, jwtConfig ],
  validationSchema: envValidate

});

const TypeOrmModuleProvider = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>(DATABASE_CONFIG)
});


@Module({
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceabilityInterceptor,
    }
  ],
  imports: [
    ConfigModuleProvider,
    TypeOrmModuleProvider,
    TypeOrmModule.forFeature([Traceability]),
    UsersModule,
    InflowsModule,
    OutflowsModule,
    AuthModule,
    AdminModule,
    ReportsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
