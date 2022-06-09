import { Module } from '@nestjs/common'
import { PostModule } from './posts/post.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { CommentsModule } from './comments/comments.module'
import { VoteModule } from './votes/vote.module'
import { UserModule } from './users/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    HttpModule,
    PostModule,
    CommentsModule,
    VoteModule,
    UserModule
  ],
})
export class AppModule {}
