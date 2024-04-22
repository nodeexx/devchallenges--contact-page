import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1).max(50),
  companyEmail: z.string().email(),
  companySize: z.string().min(1).max(50),
  subject: z.string().min(1).max(50),
  message: z.string().min(1).max(500),
});

export type FormSchema = typeof formSchema;
