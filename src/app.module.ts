import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(),
    HttpModule,
    PostModule],

})
export class AppModule {}
