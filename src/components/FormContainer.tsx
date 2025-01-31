import { FormModalProps } from '@/lib/types'
import React from 'react'
import FormModal from './FormModal'
import { db } from '@/lib/db'

const FormContainer = async ({ table, type, data, id }: FormModalProps) => {
  let relatedData = {}

  if (type !== 'delete') {
    switch (table) {
      case 'subject':
        const subjectTeachers = await db.teacher.findMany({
          select: { id: true, name: true, surname: true },
        })
        relatedData = { teachers: subjectTeachers }
        break
      case 'class':
        const classGrades = await db.grade.findMany({
          select: { id: true, level: true },
        })
        const classTeachers = await db.teacher.findMany({
          select: { id: true, name: true, surname: true },
        })
        relatedData = { teachers: classTeachers, grades: classGrades }
        break
      default:
        break
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  )
}

export default FormContainer
