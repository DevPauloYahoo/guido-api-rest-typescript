import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, 'Email é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, 'Senha é obrigatório'),
});

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(6, 'Nome deve conter no mínimo 6 caracteres'),

  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, 'Email é obrigatório')
    .email('Informe um e-mail válido'),

  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, 'Senha é obrigatório')
    .min(6, 'Senha deve conter no mínimo 6 caracteres'),
});

export const roleProfileSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(4, 'Nome deve conter no mínimo 4 caracteres'),
  description: z.string({ required_error: 'Senha é obrigatório' }).optional(),
});
