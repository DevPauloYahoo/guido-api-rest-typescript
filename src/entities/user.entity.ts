import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum, UserInterface } from '../auth';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  roles: RoleEnum[];
}
