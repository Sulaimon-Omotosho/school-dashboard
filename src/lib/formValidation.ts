import { z } from 'zod'

export const subjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: 'Subject name is required!' }),
  teachers: z.array(z.string()),
})

export type SubjectSchema = z.infer<typeof subjectSchema>
