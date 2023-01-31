import { z } from 'zod';

export const roomSchema = z.object({
  name: z
    .string({ required_error: 'Nome da Sala é obrigatório' })
    .min(1, 'Nome da Sala é obrigatório')
    .min(4, 'Nome da Sala deve ter no mínimo 4 caracteres'),
  description: z.string().optional(),
});
