import { Post } from 'src/modules/post/dao/post.dao';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { ROLE } from '../../../constant/role';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER,
  })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
