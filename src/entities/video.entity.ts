import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Room } from './room.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column({ type: 'text', unique: true })
  url: string;

  @ManyToOne(() => Room, (room) => room.videos)
  @JoinColumn({ name: 'room_id', foreignKeyConstraintName: 'pk_room_id' })
  room: Room;
}
