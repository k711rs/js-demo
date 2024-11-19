import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 20,
    comment: '角色名称',
  })
  name: string;

  @Column({
    length: 20,
    comment: '角色描述',
  })
  description: string;
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
  })
  users: User[];
}
