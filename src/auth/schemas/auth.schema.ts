import {z} from 'zod';

// ZOD Schema for SingIn
export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, 'Email é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, 'Senha é obrigatório'),
});

// ZOD Schema for SingUp
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

// ZOD Schema for create Role
export const createRoleSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(4, 'Nome deve conter no mínimo 4 caracteres'),
  description: z.string().optional(),
});

// ZOD Schema for Role
export const roleSchema = z.object({
  id: z
    .string({ required_error: 'ID da Permissão é obrigatório' })
    .min(1, 'ID da Permissão é obrigatório')
    .uuid('ID com formato incorreto'),
  name: z.string({ invalid_type_error: 'Nome deve ser um literal' }).optional(),
  description: z
    .string({ invalid_type_error: 'Nome deve ser um literal' })
    .optional(),
});

// ZOD Schema for create Profile
export const createProfileSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome deve ser um literal',
    })
    .min(1, 'Nome é obrigatório')
    .min(4, 'Nome deve conter no mínimo 4 caracteres'),
  description: z.string({ required_error: 'Senha é obrigatório' }).optional(),
  roles: z.array(roleSchema).optional(),
});

// ZOD Schema for add Role for Profile
export const addRoleToProfileSchema = z.object({
  profile_id: z
    .string({ required_error: 'ID do perfil é obrigatório' })
    .min(1, 'ID do perfil é obrigatório')
    .uuid('ID com formato incorreto'),
  role_id: z
    .string({ required_error: 'ID da Permissão é obrigatório' })
    .min(1, 'ID da Permissão é obrigatório')
    .uuid('ID com formato incorreto'),
});
