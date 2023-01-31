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

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne(() => Room, (room) => room.videos)
  @JoinColumn({ name: 'room_id', foreignKeyConstraintName: 'pk_room_id' })
  room: Room;
}
