import { auth } from '@clerk/nextjs/server'

export async function getUserData() {
  const { sessionClaims, userId } = await auth()
  const role = (sessionClaims?.metadata as { role?: string })?.role
  return { role, userId }
}

// BIG CALENDAR WEEK SORT
const currentWorkWeek = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()

  const startOfWeek = new Date(today)

  if (dayOfWeek === 0) {
    startOfWeek.setDate(today.getDate() + 1)
  }
  if (dayOfWeek === 6) {
    startOfWeek.setDate(today.getDate() + 2)
  } else {
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1))
  }
  startOfWeek.setHours(0, 0, 0, 0)

  // const endOfWeek = new Date(startOfWeek)
  // endOfWeek.setDate(startOfWeek.getDate() + 4)
  // endOfWeek.setHours(23, 59, 59, 999)

  return startOfWeek
}

export const adjustWeekSchedule = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const startOfWeek = currentWorkWeek()

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay()

    const dayFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1

    const adjustedStartDate = new Date(startOfWeek)

    adjustedStartDate.setDate(startOfWeek.getDate() + dayFromMonday)
    const adjustedEndDate = new Date(adjustedStartDate)
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    )
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    )

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    }
  })
}
