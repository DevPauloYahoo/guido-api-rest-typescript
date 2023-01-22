import { IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from './room.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({ message: 'Nome da disciplina é obrigatório' })
  @MinLength(4, { message: 'Nome deve conter no mínimo 4 caracteres' })
  @Column({ type: 'text', unique: true })
  name: string;

  @ManyToMany(() => Room, (room) => room.subjects, { cascade: true })
  rooms: Room[];
}
