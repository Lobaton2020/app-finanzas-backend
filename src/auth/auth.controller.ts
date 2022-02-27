import { Controller, Post, Body, Req, UseGuards, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async signup(@Body() user: CreateUserDto){
    const { password, ...rest } = await this.authService.create(user);
    this.logger.log("User created successfully");
    return rest;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signin(@Req() req:any){
    return this.authService.login(req.user);
  }
}
