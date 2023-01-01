import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Repository } from 'typeorm';
import { Post } from '../dao/post.dao';
import { PostDto, PostDtoCreate } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPost(user): Promise<PostDto[]> {
    let posts = await this.postRepository.find({
      where: {
        user: user.id
      },
      relations: {
        user: true
      }
    });
    return plainToInstance(PostDto, posts, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async createPost(post: PostDtoCreate): Promise<PostDto> {
    let newPost = await this.postRepository.save(post);
    return plainToInstance(PostDto, newPost, { excludeExtraneousValues: true });
  }
}
