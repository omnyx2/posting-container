import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(),
    HttpModule,
    PostModule,
    CommentsModule,
    VotesModule],

})
export class AppModule {}
