import { z } from 'zod';

export const videoSchema = z.object({
  title: z
    .string({ required_error: 'Título do vídeo é obrigatório' })
    .min(1, 'Titulo do vídeo é obrigatório')
    .min(6, 'Título do vídeo deve ter no mínimo 6 caracteres'),
  url: z
    .string({ required_error: 'URL do vídeo é obrigatório' })
    .url('Informe uma URL válida')
    .min(1, 'URL do vídeo é obrigatório')
    .min(10, 'URL do vídeo deve ter no mínimo 10 caracteres'),
});
