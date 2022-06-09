import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany, } from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import Basee from './basee.entity'
import PostEntity from './post.entity'
import VotesEntity from './vote.entity'
import UserEntity from './user.entity'

import { v4 as uuid } from 'uuid'
@Entity('comments')
export default class CommentEntity extends Basee {
  constructor(comment: Partial<Comment>) {
    super()
    Object.assign(this, comment)
  }

  @Index()
  @Column()
  identifier: string

  @Column()
  body: string

  @Column()
  username: string

  /* @anyToOne(() => UserEntity)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: UserEntity;
  */
  @ManyToOne(() => PostEntity, (post) => post.comments, { nullable: false })
  post: PostEntity

  // @ManyToOne(() => UserEntity, (user) => user.comments, { nullable: false})
  // user: UserEntity;

  @Exclude()
  @OneToMany(() => VotesEntity, (vote) => vote.comment)
  votes: VotesEntity[]

  @Expose() 
  get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0)
  }


  // protected userVote: number;
  // setUserVote(user: UserEntity) {
  //   const index = this.votes?.findIndex((v) => v.username === user.username);
  //   this.userVote = index > -1 ? this.votes[index].value : 0;
  // }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = uuid()
  }

  protected userVote: number
  setUserVote(user: UserEntity) {
    const index = this.votes?.findIndex((v) => v.username === user.username)
    this.userVote = index > -1 ? this.votes[index].value : 0
  }
}
