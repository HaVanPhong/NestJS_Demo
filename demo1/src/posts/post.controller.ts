import { Body, Controller, Post } from "@nestjs/common";
import { PostService } from "./post.service";


@Controller("posts")
export class PostController{

  constructor(private readonly postService: PostService){

  }

  @Post()
  createPost(@Body() data: any){
    this.postService.save(data);
  }
}