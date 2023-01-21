import { IsNotEmpty, MinLength } from 'class-validator';
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

  @IsNotEmpty({ message: 'Título do vídeo é obrigatório' })
  @MinLength(6, { message: 'Título deve ter no mínimo 6 caracteres' })
  @Column({ type: 'text' })
  title: string;

  @IsNotEmpty({ message: 'Título do vídeo é obrigatório' })
  @MinLength(10, { message: 'Título deve ter no mínimo 10 caracteres' })
  @Column({ type: 'text' })
  url: string;

  @ManyToOne(() => Room, (room) => room.videos)
  @JoinColumn({ name: 'room_id', foreignKeyConstraintName: 'pk_room_id' })
  room: Room;
}
