import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './role.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'profiles_roles',
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_PROFILE_ID',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_ROLE_ID',
    },
  })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;
}
