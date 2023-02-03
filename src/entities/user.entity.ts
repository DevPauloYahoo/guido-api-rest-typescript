import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profile } from './profile.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToMany(() => Profile)
  @JoinTable({
    name: 'users_profiles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_id',
    },
    inverseJoinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_profile_id',
    },
  })
  profiles: Profile[];
}
