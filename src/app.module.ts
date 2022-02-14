import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import enviromentsEnv from './config/enviroments.config';
import envValidate from './config/env.validate';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { InflowsModule } from './inflows/inflows.module';
import { OutflowsModule } from './outflows/outflows.module';
import { ReportsModule } from './reports/reports.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DATABASE_CONFG } from './config/constants.config';
import { User } from './user/entities/User.entity';
import { Inflow } from './inflows/entities/Intflow.entity';

const ConfigModuleProvider = ConfigModule.forRoot({
  envFilePath: enviromentsEnv[process.env.NODE_ENV] || '.env',
  isGlobal: true ,
  load: [ databaseConfig, appConfig ],
  validationSchema: envValidate

});

const TypeOrmModuleProvider = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>(DATABASE_CONFG)
});


@Module({
  imports: [
    ConfigModuleProvider,
    TypeOrmModuleProvider,
    TypeOrmModule.forFeature([User,Inflow]),
    UserModule,
    InflowsModule,
    OutflowsModule,
    AuthModule,
    AdminModule,
    ReportsModule
  ],
  controllers: [AppController]
})
export class AppModule {}
