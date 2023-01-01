import { Expose, Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class UserDto{
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsInt()
  @Expose()
  age: number;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @Expose()
  @IsNotEmpty()
  @Transform(({obj})=> obj.firstname+" "+ obj.lastname)
  fullname: string;

  constructor(username: string, age: number){
    this.username = username;
    this.age = age;
  }
}