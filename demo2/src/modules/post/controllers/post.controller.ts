import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { ROLE } from 'src/constant/role';
import { Auth } from 'src/modules/user/auth/auth.decorator';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { PostDtoCreate } from '../dto/post.dto';
import { PostService } from '../services/post.service';

@Controller('posts')
@Auth(ROLE.USER)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPostOfUser(@Req() req: Request) {
    return this.postService.getAllPost(req.user);
  }

  @Post()
  createPost(@Body() postDto: PostDtoCreate, @Req() req: Request) {
    let user = plainToInstance(UserDto, req.user, {excludeExtraneousValues: true})
    let post = new PostDtoCreate(postDto.title,  postDto.content, user)
    return this.postService.createPost(post);
  }
}
