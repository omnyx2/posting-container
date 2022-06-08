import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import CommentsEntity from './comment.entity'
import Basee from './basee.entity'
import PostEntity from './post.entity'
import UserEntity from './user.entity'

@Entity('votes')
export default class VotesEntity extends Basee {
  constructor(vote: Partial<VotesEntity>) {
    super()
    Object.assign(this, vote)
  }

  @Column()
  value: number

  //   @ManyToOne(() => UserEntity)
  //   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  //   user: UserEntity;

  @Column()
  username: string

  @ManyToOne(() => PostEntity)
  post: PostEntity

  @ManyToOne(() => CommentsEntity)
  comment: CommentsEntity

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: UserEntity
}
