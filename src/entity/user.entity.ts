import { IsEmail, Length } from 'class-validator'
import { Entity, Column, Index, BeforeInsert, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import PostEntity from './post.entity'
import Basee from './basee.entity'
import VotesEntity from './vote.entity'
import CommentEntity from './comment.entity'

@Entity('users')
export default class UserEntity extends Basee {
  constructor(user: Partial<UserEntity>) {
    super()
    Object.assign(this, user)
  }

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string

  @Index()
  @Length(3, 255, { message: 'Username must be at least 3 characters long' })
  @Column({ unique: true })
  username: string

  // @OneToMany(() => PostEntity, (posts) => posts.user)
  // posts: PostEntity[]

  // @OneToMany(() => CommentEntity, (comments) => comments.user)
  // comments: CommentEntity[]

  @OneToMany(() => VotesEntity, (votes) => votes.user)
  votes: VotesEntity[]
}
