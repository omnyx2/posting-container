import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/auth/auth.module';
import UserEntity from '../entity/user.entity';
import CommentEntity  from '../entity/comment.entity';
import PostEntity from '../entity/post.entity';
import { CommentController  } from './comments.controller';
import { CommentService }  from './comments.service';
import { PostModule } from '../posts/post.module';

import { CommentRepository } from 'src/entity/comment.repository';
import { PostRepository } from 'src/entity/post.repository';
import { VoteRepository } from 'src/entity/vote.repository';
import { VoteController } from 'src/votes/vote.controller';
import { VoteService } from 'src/votes/vote.service';
import VoteEntity from 'src/entity/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
 //     SubRepository,
      PostEntity,
      VoteEntity,
      UserEntity
    ]),
 //   AuthModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService
  ],
})
export class CommentsModule {}
