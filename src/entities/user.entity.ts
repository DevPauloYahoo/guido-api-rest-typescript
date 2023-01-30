import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum, UserInterface } from '../auth';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({ message: 'Nome do Usuário é obrigatório' })
  @MinLength(4, { message: 'Nome deve ter no mínimo 6 caracteres' })
  @Column({ type: 'text' })
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @Column({ type: 'text', unique: true })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @MinLength(4, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  roles: RoleEnum[];
}
