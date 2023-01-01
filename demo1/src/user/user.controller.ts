import { Body, Controller, Get, Post} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer'
import { StoreService } from 'src/store/store.service';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly storeService: StoreService
  ){}

  @Get()
  getAllUser(): UserDto {
    return this.userService.getUser();
  }


  @Post()
  createUser(@Body() user:UserDto){
    const userValidator= plainToInstance(UserDto, user, {excludeExtraneousValues: true})
    return this.storeService.save(userValidator);
  }
}
