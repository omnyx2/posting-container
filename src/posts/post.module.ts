import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import PostEntity from '../entity/post.entity'
import UserEntity from '../entity/user.entity'
import CommentsEntity from '../entity/comment.entity'
import VoteEntity from 'src/entity/vote.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsEntity,
      UserEntity,
      //      SubRepository,
      PostEntity,
      VoteEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
