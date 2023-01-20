import { IsNotEmpty, MinLength } from 'class-validator';
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

  @IsNotEmpty({ message: 'Nome da Sala é obrigatório' })
  @MinLength(4, { message: 'Nome deve ter no mínimo 4 caracteres' })
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
