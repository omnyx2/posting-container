import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CommentsModule } from './comments/comments.module';
import { VoteModule } from './votes/vote.module';
   @Module({
  imports: [ 
    TypeOrmModule.forRoot(),
    HttpModule,
    PostModule,
    CommentsModule,
    VoteModule
  ],

})
export class AppModule {}
