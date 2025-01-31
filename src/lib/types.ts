import { FieldError } from 'react-hook-form'

export type Column = {
  header: string
  accessor: string
  className?: string
}

export interface FormModalProps {
  table:
    | 'teacher'
    | 'student'
    | 'parent'
    | 'subject'
    | 'class'
    | 'lesson'
    | 'exam'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement'
  type: 'create' | 'update' | 'delete'
  data?: any
  id?: number | string
}

export type InputFieldProps = {
  label: string
  type?: string
  register: any
  name: string
  defaultValue?: string
  error?: FieldError
  hidden?: boolean
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}
