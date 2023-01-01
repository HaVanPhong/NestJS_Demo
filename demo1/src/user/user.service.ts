import { Injectable } from "@nestjs/common/decorators";
import { UserDto } from "./user.dto";

@Injectable()
export class UserService{
  getUser(){
    return new UserDto("Phong", 20);
  }
  
  createUser(user: any){
    return user
  }
}