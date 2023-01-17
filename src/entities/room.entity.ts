import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
