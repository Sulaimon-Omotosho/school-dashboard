import { db } from '@/lib/db'
import React from 'react'
import BigCalendar from './BigCalendar'

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: 'teacherId' | 'classId'
  id: string | number
}) => {
  const dataRes = await db.lesson.findMany({
    where: {
      ...(type === 'teacherId'
        ? { teacher: { clerkId: id as string } }
        : { classId: id as string }),
    },
  })

  const data: { title: string; start: Date; end: Date }[] = dataRes.map(
    (lesson) => ({
      title: lesson.name,
      start: new Date(lesson.startTime),
      end: new Date(lesson.endTime),
    })
  )
  return (
    <div>
      <BigCalendar data={data} />
    </div>
  )
}

export default BigCalendarContainer
