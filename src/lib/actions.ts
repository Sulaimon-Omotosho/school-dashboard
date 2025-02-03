'use server'

import { db } from './db'
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from './formValidation'
import { clerkClient } from '@clerk/nextjs/server'
import { getUserData } from './utils'

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

// EXAM
export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { role, userId } = await getUserData()

  try {
    if (role === 'teacher') {
      const teacherLesson = db.lesson.findFirst({
        where: {
          teacher: {
            is: {
              clerkId: userId!,
              id: data.lessonId,
            },
          },
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true }
      }
    }

    await db.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { role, userId } = await getUserData()

  try {
    if (role === 'teacher') {
      const teacherLesson = db.lesson.findFirst({
        where: {
          teacher: {
            is: {
              clerkId: userId!,
              id: data.lessonId,
            },
          },
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true }
      }
    }

    await db.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string
  try {
    await db.exam.delete({
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
    const clerk = await clerkClient()

    const user = await clerk.users.updateUser(data.clerkId as string, {
      username: data.username,
      ...(data.password ? { password: data.password } : {}),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'teacher' },
    })

    await db.teacher.update({
      where: {
        id: data.id,
      },
      data: {
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
          set: data.subjects?.map((subjectId: string) => ({
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

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string
  const clerkId = await db.teacher.findUnique({
    where: {
      id,
    },
    select: {
      clerkId: true,
    },
  })
  // console.log(clerkId)

  if (clerkId) {
    try {
      // Delete from Clerk if `clerkId` exists
      const clerk = await clerkClient()
      await clerk.users.deleteUser(clerkId.clerkId)

      await db.teacher.delete({
        where: {
          id,
        },
      })

      return { success: true, error: false }
    } catch (error) {
      console.log(error)
      return { success: false, error: true }
    }
  }
}

// STUDENT
export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    const classItem = await db.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    })

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true }
    }

    const clerk = await clerkClient()

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'student' },
      emailAddress: [data.email as string],
    })

    await db.student.create({
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
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    const clerk = await clerkClient()

    const user = await clerk.users.updateUser(data.clerkId as string, {
      username: data.username,
      ...(data.password ? { password: data.password } : {}),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'teacher' },
    })

    await db.student.update({
      where: {
        id: data.id,
      },
      data: {
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
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string
  const clerkId = await db.student.findUnique({
    where: {
      id,
    },
    select: {
      clerkId: true,
    },
  })

  if (clerkId) {
    try {
      const clerk = await clerkClient()
      await clerk.users.deleteUser(clerkId.clerkId)

      await db.student.delete({
        where: {
          id,
        },
      })

      return { success: true, error: false }
    } catch (error) {
      console.log(error)
      return { success: false, error: true }
    }
  }
}
