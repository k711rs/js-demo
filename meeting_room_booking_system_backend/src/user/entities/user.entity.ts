import { Role } from './role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 32,
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'nick_name',
    length: 20,
    comment: '昵称',
  })
  nickname: string;

  @Column({
    length: 20,
    comment: '邮箱',
  })
  email: string;

  @Column({
    length: 100,
    comment: '头像',
    nullable: true,
  })
  headUrl: string;

  @Column({
    length: 20,
    comment: '电话',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    default: false,
    comment: '是否冻结',
  })
  isFrozen: boolean;

  @Column({
    default: false,
    comment: '是否为管理员',
  })
  isAdmin: boolean;

  @Column({
    comment: '是否删除',
    default: false,
  })
  isDeleted: boolean;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];
}
