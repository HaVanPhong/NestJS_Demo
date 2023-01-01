import { Expose } from 'class-transformer';
import { IsNotEmpty, Length, IsAlphanumeric } from 'class-validator';

export class UserDto {
  @Expose()
  id: string;

  @IsNotEmpty()
  @Expose()
  @Length(6, 12)
  username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @IsAlphanumeric()
  password: string;

  @IsNotEmpty()
  @Expose()
  fullName: string;

  @IsNotEmpty()
  @Expose()
  phone: string;

  @Expose()
  role: string;
}

export class UserDtoCreate {
  @IsNotEmpty()
  @Expose()
  @Length(6, 12)
  username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @IsAlphanumeric()
  @Expose()
  password: string;

  @IsNotEmpty()
  @Expose()
  fullName: string;

  @IsNotEmpty()
  @Expose()
  phone: string;
}

export class UserDtoUpdate {
  @IsNotEmpty()
  @Expose()
  fullName: string;
  @IsNotEmpty()
  @Expose()
  phone: string;
}

export class UserDtoUpdatePassword {
  @IsNotEmpty()
  @Length(6, 12)
  @IsAlphanumeric()
  password: string;
}

export class UserDtoLogin {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
