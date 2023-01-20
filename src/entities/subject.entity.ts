import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from './room.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @ManyToMany(() => Room, (room) => room.subjects, { cascade: true })
  rooms: Room[];
}
