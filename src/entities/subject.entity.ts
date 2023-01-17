import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Room } from './room.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToMany(() => Room, (room) => room.subjects)
  @JoinTable({
    name: 'room_subject',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
  })
  rooms: Room[];
}
