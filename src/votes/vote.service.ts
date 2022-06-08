import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import CommentsEntity from 'src/entity/comment.entity'
//import { CommentsEntity } from 'src/entities/comment/comments.repository';
//import { PostEntity } from 'src/entities/post/post.repository';
//import { SubRepository } from 'src/entities/sub/sub.repository';
import UserEntity from 'src/entity/user.entity'
import PostEntity from 'src/entity/post.entity'
import VotesEntity from 'src/entity/vote.entity'
// import { CommentRepository } from 'src/entity/comment.repository'
// import { PostRepository } from 'src/entity/post.repository'
// import { VoteRepository } from 'src/entity/vote.repository'

//import { VotesEntity } from 'src/entities/votes/votes.repository';
import { VoteDto } from './vote.dto'
import { Repository, Equal } from 'typeorm'
import { GetUser } from '../util/authCtx'

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentRepo: Repository<CommentsEntity>,
    //  @InjectRepository(SubRepository) private subRepo: SubRepository,
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    @InjectRepository(VotesEntity) private voteRepo: Repository<VotesEntity> // @InjectRepository(VoteRepository) private voteRepo: VoteRepository, // @InjectRepository(CommentRepository) private commentRepo: CommentRepository, // @InjectRepository(PostRepository) private postRepo: PostRepository
  ) {}

  async vote(voting: VoteDto, user: UserEntity) {
    const { identifier, slug, commentIdentifier, value } = voting

    // Validate vote value
    if (![-1, 0, 1].includes(value)) {
      throw new BadRequestException('Value must be -1, 0 or 1')
    }

    try {
      let post = await this.postRepo.findOne({ where: { identifier, slug } })
      let vote: VotesEntity | undefined
      let comment: CommentsEntity | undefined
      if (!!commentIdentifier) {
        // IF there is a comment identifier find vote by comment
        comment = await this.commentRepo.findOne({
          where: { identifier: commentIdentifier },
        })
        vote = await this.voteRepo.findOne({
          where: {
            comment: Equal(comment),
            user: Equal(user),
          },
        })
      } else if (!!identifier) {
        // Else find vote by post
        vote = await this.voteRepo.findOne({
          where: {
            post: Equal(post),
            user: Equal(user),
          },
        })
      }
      console.log(user)
      // 만약에 Vote가 없으면 에러 발생
      if (!vote && value === 0) {
        // if no vote and value = 0 return error
        throw new NotFoundException('Vote not found')
      } else if (!vote) {
        // If no vote create it
        vote = new VotesEntity({ value }) // user });
        vote.username = user.username
        vote.user = user
        if (comment) vote.comment = comment
        else vote.post = post
        await this.voteRepo.create(vote).save()
      } else if (value === 0) {
        // If vote exists and value = 0 remove vote from DB
        await vote.remove()
      } else if (vote.value !== value) {
        // If vote and value has changed, update vote
        vote.value = value
        await vote.save()
      }

      post = await this.postRepo.findOneOrFail({
        where: { identifier, slug },
        relations: ['comments', 'comments.votes', 'votes'],
      })
      post.setUserVote(user)
      post.comments.forEach((c) => c.setUserVote(user))

      return post
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException()
    }
  }
}
