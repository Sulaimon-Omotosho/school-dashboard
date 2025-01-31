'use server'

import { revalidatePath } from 'next/cache'
import { db } from './db'
import { ClassSchema, SubjectSchema, TeacherSchema } from './formValidation'
import { clerkClient, createClerkClient } from '@clerk/nextjs/server'
// import { clerkClient } from '@clerk/nextjs/server'

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

// TEACHER
export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const clerk = await clerkClient()

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'teacher' },
      emailAddress: [data.email as string],
    })

    await db.teacher.create({
      data: {
        clerkId: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: subjectId,
          })),
        },
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    await db.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string
  try {
    await db.teacher.delete({
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
