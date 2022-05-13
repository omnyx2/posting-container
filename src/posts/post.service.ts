import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from '../entity/post.entity';
import { EntityNotFoundError } from 'typeorm';
import { GetPaginatedPostParamDto, CreatePostDto } from './post.dto';
@Injectable()
export class PostService {
  
  @InjectRepository()
  constructor(){} 

  async createPost(createPost: CreatePostDto) {
    const { title, body, sub } = createPost;
    
    if (title.trim() === '') {
      throw new NotFoundException('title must not be empty');
    }
    
    try {
      const subRecord = await this.subRepo.findOneOrFail({ name: sub });

      const post: Partial<PostEntity> = {
        title,
        body,
        user,
        sub: subRecord,
      };
      const result = post //await this.postRepo.create(post).save();
    
      return result;
    
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Sub not found');
      }
      throw new InternalServerErrorException();
    }
  }

  // async getPosts(post?: GetPaginatedPostParamDto, user?: UserEntity): Post[] {
  async getPosts(post?: GetPaginatedPostParamDto ) {

    const result = [];
    return result;
  }
}
