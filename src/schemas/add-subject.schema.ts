import { z } from 'zod';

export const addSubjectSchema = z.object({
  roomId: z
    .string({
      required_error: 'O código da Sala é obrigatório',
      invalid_type_error: 'O código da Sala deve ser literal',
    })
    .min(1, 'O código da Sala é obrigatório'),

  subjectId: z
    .string({
      required_error: 'O código da disciplina é obrigatório',
      invalid_type_error: 'O código da disciplina deve ser literal',
    })
    .min(1, 'O código da disciplina é obrigatório'),
});
