import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { compare } from "bcryptjs"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email:string, password:string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && await compare(password, user.password || '')) {
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
          access_token: this.jwtService.sign(payload),
        };
      }
}
