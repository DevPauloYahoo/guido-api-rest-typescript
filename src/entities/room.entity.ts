import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Subject } from './subject.entity';
import { Video } from './video.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Video, (video) => video.room)
  videos: Video[];

  @ManyToMany(() => Subject, (subject) => subject.rooms)
  @JoinTable({
    name: 'room_subject',
    joinColumn: {
      name: 'room_id',
      foreignKeyConstraintName: 'PK_ROOM_ID',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subject_id',
      foreignKeyConstraintName: 'PK_SUBJECT_ID',
      referencedColumnName: 'id',
    },
  })
  subjects: Subject[];
}
