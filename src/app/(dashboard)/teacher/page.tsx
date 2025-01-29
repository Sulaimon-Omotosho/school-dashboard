import Announcement from '@/components/Announcement'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const TeacherPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined }
}) => {
  const userId = auth()

  return (
    <div className='p-4 flex flex-1 gap-4 flex-col xl:flex-row'>
      {/* LEFT  */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule</h1>
          <BigCalendarContainer type='teacherId' id={userId! as any} />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <EventCalendarContainer searchParams={searchParams} />
        <Announcement />
      </div>
    </div>
  )
}

export default TeacherPage
