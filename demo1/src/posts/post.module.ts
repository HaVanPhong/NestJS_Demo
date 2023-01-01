import { Module } from "@nestjs/common";
import { StoreModule } from "src/store/store.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  imports: [StoreModule.register({dir: "store", filename: "posts.json"})],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule{

}