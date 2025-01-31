import { z } from 'zod'

export const subjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: 'Subject name is required!' }),
  teachers: z.array(z.string()),
})

export type SubjectSchema = z.infer<typeof subjectSchema>

export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters!' }),
  capacity: z.coerce.number().min(1, { message: 'Capacity is required!' }),
  gradeId: z.string().min(1, { message: 'Grade is required!' }),
  supervisorId: z.string().optional(),
})

export type ClassSchema = z.infer<typeof classSchema>
