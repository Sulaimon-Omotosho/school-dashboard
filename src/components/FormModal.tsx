'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useState } from 'react'

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
  loading: () => <h1>Loading...</h1>,
})
const StudentsForm = dynamic(() => import('./forms/StudentsForm'), {
  loading: () => <h1>Loading...</h1>,
})
const AnnouncementForm = dynamic(() => import('./forms/AnnouncementForm'))
const AssignmentForm = dynamic(() => import('./forms/AssignmentForm'))
const AttendanceForm = dynamic(() => import('./forms/AttendanceForm'))
const ClassForm = dynamic(() => import('./forms/ClassForm'))
const EventForm = dynamic(() => import('./forms/EventForm'))
const ExamForm = dynamic(() => import('./forms/ExamForm'))
const LessonForm = dynamic(() => import('./forms/LessonForm'))
const ParentForm = dynamic(() => import('./forms/ParentForm'))
const ResultForm = dynamic(() => import('./forms/ResultForm'))
const SubjectForm = dynamic(() => import('./forms/SubjectForm'))

const forms: {
  [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentsForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
}

interface FormModalProps {
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
  id?: number
}

const FormModal: React.FC<FormModalProps> = ({ table, type, data, id }) => {
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
  const bgColor =
    type === 'create'
      ? 'bg-lamaYellow'
      : type === 'update'
      ? 'bg-lamaSky'
      : 'bg-lamaPurple'

  const [open, setOpen] = useState(false)

  const Form = () => {
    return type === 'delete' && id ? (
      <form
        action={''}
        className='p-4 flex flex-col
      gap-4 '
      >
        <span className='text-center font-medium'>
          Are you sure you want to delete all data of {table}?
        </span>
        <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'>
          Delete
        </button>
      </form>
    ) : type === 'create' || type === 'update' ? (
      forms[table](type, data)
    ) : (
      'Form not found!'
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
      >
        <Image src={`/${type}.png`} alt='icon' width={16} height={16} />
      </button>
      {open && (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center '>
          <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            <Form />
            <div
              className='absolute top-4 right-4 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              <Image src='/close.png' alt='close' width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal
