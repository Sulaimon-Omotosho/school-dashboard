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

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters!' })
    .max(20, { message: 'Username must be at most 20 characters!' }),
  email: z
    .string()
    .email({ message: 'Invalid email address!' })
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, { message: 'Password must be min of 8 characters long!' }),
  name: z.string().min(1, { message: 'First name is required!' }),
  surname: z.string().min(1, { message: 'Last name is required!' }),
  phone: z.string().optional(),
  address: z.string().min(5, { message: 'Address is required!' }),
  bloodType: z.string().min(1, { message: 'Blood type is required!' }),
  birthday: z.coerce.date({ message: 'Birthday is required!' }),
  sex: z.enum(['MALE', 'FEMALE'], { message: 'Sex is required!' }),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(),
})

export type TeacherSchema = z.infer<typeof teacherSchema>
