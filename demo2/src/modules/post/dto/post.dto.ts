import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class PostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  user: UserDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date;
}

export class PostDtoCreate {
  constructor(title: string, content: string, user: UserDto){
    this.title = title
    this.content = content
    this.user = user
  }

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  user: UserDto;
}
