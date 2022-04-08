import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { compare } from "bcryptjs"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/config/constants.config';
import { IJwtConfig } from 'src/config/app.config';
@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async validateUser(email:string, password:string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && await compare(password, user.password || '') && user.status === true) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }

    async create(user: CreateUserDto){
        return await this.usersService.create(user);
    }

    async login(user: any) {
        const payload = {
          sub: user.id,
          rol: user.rol,
          name: user.completeName
         };

        return {
          accessToken: this.jwtService.sign(payload),
          refreshToken: this.jwtService.sign(payload,{
            expiresIn: this.configService.get<IJwtConfig>(JWT_CONFIG).expirationTimeRefresh+'s',
            secret: this.configService.get<IJwtConfig>(JWT_CONFIG).secretKeyRefresh,
          }),
          accessTokenExpiration: this.configService.get<IJwtConfig>(JWT_CONFIG).expirationTime,
          refreshTokenExpiration: this.configService.get<IJwtConfig>(JWT_CONFIG).expirationTimeRefresh,
        };
      }

    async getNewToken(refreshToken: string){
      try{
        const tokenInfo = this.jwtService.verify(refreshToken, {secret: this.configService.get<IJwtConfig>(JWT_CONFIG).secretKeyRefresh});
        const user = await this.usersService.findOneForRefreshToekn(tokenInfo.sub);
        return await this.login(user);
      }catch(err){
        this.logger.error(err);
        throw new BadRequestException("The token is invalid or expired");
      }
    }
}
