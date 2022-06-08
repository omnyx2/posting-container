import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import Basee from './basee.entity'
import CommentEntity from './comment.entity'
import VotesEntity from './vote.entity'
import UserEntity from './user.entity'

@Entity('posts')
export default class PostEntity extends Basee {
  constructor(post: Partial<PostEntity>) {
    super()
    Object.assign(this, post)
  }

  @Index()
  @Column()
  identifier: string // uuid v4

  @Column()
  title: string

  @Index()
  @Column()
  slug: string

  @Column({ nullable: true, type: 'text' })
  body: string

  @Column()
  subName: string

  @Column()
  username: string

  // @ManyToOne(() => UserEntity, (user) => user.posts)
  // @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  // user: UserEntity

  @Exclude()
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[]

  @Exclude()
  @OneToMany(() => VotesEntity, (vote) => vote.post)
  votes: VotesEntity[]

  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0)
  }

  @Expose() get commentCount(): number {
    return this.comments?.length
  }

  @Expose() get commentList(): CommentEntity[] {
    return this.comments
  }

  protected userVote: number
  setUserVote(user: UserEntity) {
    const index = this.votes?.findIndex((v) => v.username === user.username)
    this.userVote = index > -1 ? this.votes[index].value : 0
  }
}
