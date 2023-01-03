import { Body, Controller, Post, Get, Req, Headers } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ROLE } from 'src/common/constant/role';
import { Auth } from 'src/modules/user/auth/auth.decorator';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { PostDtoCreate } from '../dto/post.dto';
import { PostService } from '../services/post.service';

@Controller('posts')

export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Auth(ROLE.USER)
  getAllPostOfUser(@Req() req) {
    
    return this.postService.getAllPost(req.user);
  }

  @Post()
  createPost(@Body() postDto: PostDtoCreate, @Req() req) {
    let user = plainToInstance(UserDto, req.user, {excludeExtraneousValues: true})
    let post = new PostDtoCreate(postDto.title,  postDto.content, user)
    return this.postService.createPost(post);
  }
}
