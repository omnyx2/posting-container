import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { VoteController } from './vote.controller';
// import { VoteService } from './vote.service';

import PostEntity from '../entity/post.entity';
import CommentEntity from '../entity/comment.entity';
import VotesEntity from '../entity/vote.entity';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      PostEntity,
      VotesEntity,
    ]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
})

export class VotesModule {}
