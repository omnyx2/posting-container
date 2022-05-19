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
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

interface Post {
  title: string;
  body: string;
  user: string;
  sub: string;
}

@Injectable()
export class PostService {
  
  constructor(
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
  ){} 
 
  async createPost(createPost: CreatePostDto) {// , user: UserEntity) {
    const { title, body, sub } = createPost;
    if (title.trim() === '') {
      throw new NotFoundException('title must not be empty');
    }
    try {
 //     const subRecord = await this.subRepo.findOneOrFail({ name: sub });
      const identifier = uuid()
      const post: Partial<PostEntity> = {
        title,
        body,
        identifier,
        slug: `${title}-${identifier.slice(0,8)}`,
        username: "tester",
        subName: "sakeL"
        // user,
        // sub: subRecord,
      };
      console.log("working...")
      const result = await this.postRepo.save(post);

      return result;
    } catch (error) {
 
      if (error instanceof EntityNotFoundError) {
        console.log(error)
        throw new NotFoundException('Sub not found');
      }
        console.log(error)
      throw new InternalServerErrorException();
    }
  }

  // async getPosts(post?: GetPaginatedPostParamDto, user?: UserEntity): Post[] {
  async getPosts(post?: GetPaginatedPostParamDto ) {
    const { count, page } = post;
    const currentPage: number = (page || 0) as number;
    const postsPerPage: number = (count || 8) as number;
    try {
      const posts = await this.postRepo.find({
        order: { createAt: 'DESC' },
        // relations: ['comments', 'votes', 'sub'],
        skip: currentPage * postsPerPage,
        take: postsPerPage,
      });
      console.log(posts)
//      if (user) {
//        posts.forEach((p) => p.setUserVote(user));
//      }

      return posts;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
  }
}
