import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDtoCreate, UserDtoLogin } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userRegister: UserDtoCreate) {
    const user = plainToInstance(UserDtoCreate, userRegister, {
      excludeExtraneousValues: true,
    });
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body() userLogin: UserDtoLogin) {
    return await this.authService.login(userLogin);
  }
}
