import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Post,
  Delete
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Auth } from 'src/modules/user/auth/auth.decorator';
import { ROLE } from 'src/common/constant/role';
import {
  UserDtoCreate,
  UserDtoUpdate,
  UserDtoUpdatePassword,
} from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth(ROLE.ADMIN)
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() userDto: UserDtoCreate) {
    const newUser = plainToInstance(UserDtoCreate, userDto, {
      excludeExtraneousValues: true,
    });
    return this.userService.create(newUser);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDtoUpdate: UserDtoUpdate) {
    const userUpdate = plainToInstance(UserDtoUpdate, userDtoUpdate, {
      excludeExtraneousValues: true,
    });
    return this.userService.update(id, userUpdate);
  }

  @Patch('passowrd/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() userPassword: UserDtoUpdatePassword,
  ) {
    const userUpdate = plainToInstance(UserDtoUpdatePassword, userPassword, {
      excludeExtraneousValues: true,
    });
    return this.userService.updatePassword(id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
