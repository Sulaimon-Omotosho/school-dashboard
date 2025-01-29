import Announcement from '@/components/Announcement'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'
import React from 'react'

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined }
}) => {
  return (
    <div
      className='flex p-4 gap-4 flex-col
   md:flex-row'
    >
      {/* LEFT SIDE  */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* USER CARD  */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='admin' />
          <UserCard type='teacher' />
          <UserCard type='student' />
          <UserCard type='parent' />
        </div>
        {/* MIDDLE CHARTS  */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* COUNT CHART  */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChartContainer />
          </div>
          {/* ATTENDANCE CHART  */}
          <div className='w-full lg:w-2/3 h-[450px]'>
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHARTS  */}
        <div className='w-full h-[500px]'>
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT SIDE  */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendarContainer searchParams={searchParams} />
        <Announcement />
      </div>
    </div>
  )
}

export default AdminPage
