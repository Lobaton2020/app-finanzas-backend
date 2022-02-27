import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/config/constants.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IJwtConfig } from 'src/config/app.config';

 const JwtModuleProvider = JwtModule.registerAsync({
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<IJwtConfig>(JWT_CONFIG).secretKey,
    signOptions:{
      expiresIn: `${configService.get<IJwtConfig>(JWT_CONFIG).expirationTime}s`,
    }
  }),
  inject: [ConfigService],
});

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports:[ UsersModule, JwtModuleProvider ]
})
export class AuthModule {}
