import { Module } from '@nestjs/common';
import { PostsModule } from './posts/post.module';

@Module({
  imports: [PostsModule],
})
export class AppModule {}
