import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, PostModule],
})
export class AppModule {}
