import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { VoteController } from './vote.controller';
// import { VoteService } from './vote.service';
import UserEntity from '../entity/user.entity';
import PostEntity from '../entity/post.entity';
import CommentEntity from '../entity/comment.entity';
import VotesEntity from '../entity/vote.entity';


import { CommentRepository } from 'src/entity/comment.repository';
import { PostRepository } from 'src/entity/post.repository';
import { UserRepository } from 'src/entity/user.repository';
import { VoteRepository } from 'src/entity/vote.repository';


import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      PostRepository,
      VoteRepository,
      UserRepository,
    ]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
})

export class VoteModule {}
