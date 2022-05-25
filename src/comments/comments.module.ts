import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/auth/auth.module';
import CommentEntity  from '../entity/comment.entity';
import PostEntity from '../entity/post.entity';
import { CommentController  } from './comments.controller';
import { CommentService }  from './comments.service';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
 //     SubRepository,
      PostEntity
    ]),
 //   AuthModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService
  ],
})
export class CommentsModule {}
