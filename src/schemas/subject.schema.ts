import { z } from 'zod';

export const subjectSchema = z.object({
  name: z
    .string({ required_error: 'Nome da disciplina é obrigatório' })
    .min(1, 'Nome da disciplina é obrigatório')
    .min(4, 'Nome da disciplina deve ter no mínimo 4 caracteres'),
});
