import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPostParamDto } from './comments.dto';
import  CommentEntity from '../entity/comment.entity';
import { Repository } from'typeorm';
import PostEntity from '../entity/post.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>,
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>
  ){}
   
  async commentOnPost(
    getPostParam: GetPostParamDto,
  //  user: UserEntity,
    body: string,
  ) {
    const { identifier, slug } = getPostParam;
    try {
      const post = await this.postRepo.findOne({ where: {identifier, slug} });
      const comment: Partial<CommentEntity> = {
        body,
   //     user,
        username: "writer",
        post,
      };
      console.log(comment)
      const result = await this.commentRepo.create(comment).save();
    
      return result;

    } catch (error) {
      
      console.log(error)
      throw new InternalServerErrorException();
    }
  }

  async getPostComments(getPostParam: GetPostParamDto) {
    const { identifier, slug } = getPostParam;
    try {
      const post = await this.postRepo.findOne({ where: {identifier, slug} });

      const comments = await this.commentRepo.find({
        relations: [ "post", 'votes'],
        order: { createAt: 'DESC' },
      //  relations: ['votes'],
      });
      // if (user) {
      //  comments.forEach((c) => c.setUserVote(user));
      // }
      return comments;
    } catch (error) {
      
      throw new BadRequestException();
    }
  }}
