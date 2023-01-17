import {
  Column,
  Entity,
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

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Video, (video) => video.room)
  videos: Video[];

  @ManyToMany(() => Subject, (subject) => subject.rooms)
  subjects: Subject[];
}
