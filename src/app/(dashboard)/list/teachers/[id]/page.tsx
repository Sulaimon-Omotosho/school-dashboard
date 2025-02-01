import Announcement from '@/components/Announcement'
import BigCalendar from '@/components/BigCalendar'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import FormContainer from '@/components/FormContainer'
import Performance from '@/components/Performance'
import { db } from '@/lib/db'
import { getUserData } from '@/lib/utils'
import { Teacher } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const SingleTeacherPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const { role, userId } = await getUserData()

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lesson: number; classes: number }
      })
    | null = await db.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lesson: true,
          classes: true,
        },
      },
    },
  })

  if (!teacher) {
    return notFound()
  }
  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row gap-4'>
      {/* LEFT  */}
      <div className='w-full xl:w-2/3'>
        {/* TOP  */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USER INFO CARD  */}
          <div className='bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4'>
            <div className='w-1/3'>
              <Image
                src={teacher.img || '/noAvatar.png'}
                alt='Teacher Avatar'
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>
                  {teacher.name + ' ' + teacher.surname}
                </h1>
                {role === 'admin' && (
                  <FormContainer table='teacher' type='update' data={teacher} />
                )}
              </div>
              <p className='text-sm text-gray-500'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                quas voluptatum quidem?
              </p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/blood.png' alt='icon' width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/date.png' alt='icon' width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat('en-US').format(teacher.birthday)}
                  </span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/mail.png' alt='icon' width={14} height={14} />
                  <span>{teacher.email || '-'}</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/phone.png' alt='icon' width={14} height={14} />
                  <span>{teacher.phone || '-'}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS  */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap'>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleAttendance.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>90%</h1>
                <span className=' text-sm text-gray-400'>Attendance</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleBranch.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>
                  {teacher._count.subjects}
                </h1>
                <span className=' text-sm text-gray-400'>Subjects</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleLesson.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>
                  {teacher._count.lesson}
                </h1>
                <span className=' text-sm text-gray-400'>Lessons</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleClass.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>
                  {teacher._count.classes}
                </h1>
                <span className=' text-sm text-gray-400'>Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1 className=''>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type='teacherId' id={teacher.id} />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white rounded-md p-4'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
            <Link
              href={`/list/classes?supervisorId=${'678f838f61d52db1547966c5'}`}
              className='p-3 rounded-md bg-lamaSkyLight'
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              href={`/list/students?teacherId=${'678f838f61d52db1547966ba'}`}
              className='p-3 rounded-md bg-lamaPurpleLight'
            >
              Teacher&apos;s Students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${'678f838f61d52db1547966ba'}`}
              className='p-3 rounded-md bg-lamaYellowLight'
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              href={`/list/exams?teacherId=${'678f838f61d52db1547966ba'}`}
              className='p-3 rounded-md bg-pink-50'
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?teacherId=${'678f838f61d52db1547966ba'}`}
              className='p-3 rounded-md bg-lamaSkyLight'
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  )
}

export default SingleTeacherPage
