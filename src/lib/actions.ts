'use server'

import { revalidatePath } from 'next/cache'
import { db } from './db'
import { ClassSchema, SubjectSchema } from './formValidation'

export type CurrentState = { success: boolean; error: boolean }

// SUBJECT
export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await db.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await db.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string
  try {
    await db.subject.delete({
      where: {
        id: id,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

// CLASS
export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await db.class.create({
      data,
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await db.class.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data?.supervisorId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string
  try {
    await db.class.delete({
      where: {
        id: id,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}
