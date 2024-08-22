import Announcement from '@/components/Announcement'
import BigCalendar from '@/components/BigCalendar'
import FormModal from '@/components/FormModal'
import Performance from '@/components/Performance'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleTeacherPage = () => {
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
                src='https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200'
                alt='teacher'
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>John Doe</h1>
                <FormModal
                  table='teacher'
                  type='update'
                  data={{
                    id: 1,
                    username: 'john67890',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'testing123',
                    email: 'john@doe.com',
                    photo:
                      'https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200',
                    phone: '1234567890',
                    bloodType: 'A',
                    birthday: 12 / 25 / 1990,
                    sex: 'male',
                    address: '123 Main St, Anytown, USA',
                  }}
                />
              </div>
              <p className='text-sm text-gray-500'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                quas voluptatum quidem?
              </p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/blood.png' alt='icon' width={14} height={14} />
                  <span>A</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/date.png' alt='icon' width={14} height={14} />
                  <span>August 2024</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/mail.png' alt='icon' width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/phone.png' alt='icon' width={14} height={14} />
                  <span>+1 234 567 8901</span>
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
                <h1 className='text-xl font-semibold'>2</h1>
                <span className=' text-sm text-gray-400'>Branches</span>
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
                <h1 className='text-xl font-semibold'>6</h1>
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
                <h1 className='text-xl font-semibold'>5</h1>
                <span className=' text-sm text-gray-400'>Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1 className=''>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white rounded-md p-4'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
            <Link href='/' className='p-3 rounded-md bg-lamaSkyLight'>
              Teacher&apos;s Classes
            </Link>
            <Link href='/' className='p-3 rounded-md bg-lamaPurpleLight'>
              Teacher&apos;s Students
            </Link>
            <Link href='/' className='p-3 rounded-md bg-lamaYellowLight'>
              Teacher&apos;s Lessons
            </Link>
            <Link href='/' className='p-3 rounded-md bg-pink-50'>
              Teacher&apos;s Exams
            </Link>
            <Link href='/' className='p-3 rounded-md bg-lamaSkyLight'>
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
