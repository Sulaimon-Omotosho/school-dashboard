import { Day, PrismaClient, UserSex } from '@prisma/client'
import { ObjectId } from 'bson'

const prisma = new PrismaClient()

async function main() {
  // ADMIN
  await prisma.admin.createMany({
    data: [
      { id: new ObjectId().toHexString(), username: 'admin1' },
      { id: new ObjectId().toHexString(), username: 'admin2' },
    ],
  })

  // GRADE
  const grades = await prisma.$transaction(
    Array.from({ length: 6 }, (_, i) =>
      prisma.grade.create({
        data: { id: new ObjectId().toHexString(), level: i + 1 },
      })
    )
  )
  const gradeIds = grades.map((g) => g.id)

  // CLASS
  const classes = await prisma.$transaction(
    gradeIds.map((gradeId, i) =>
      prisma.class.create({
        data: {
          id: new ObjectId().toHexString(),
          name: `${i + 1}A`,
          gradeId,
          capacity: Math.floor(Math.random() * 6) + 15, // Random between 15-20
        },
      })
    )
  )
  const classIds = classes.map((c) => c.id)

  // SUBJECTS
  const subjects = await prisma.$transaction(
    [
      'Mathematics',
      'Science',
      'English',
      'History',
      'Geography',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Art',
    ].map((name) => prisma.subject.create({ data: { name } }))
  )
  const subjectIds = subjects.map((s) => s.id)

  // TEACHERS
  const teachers = await prisma.$transaction(
    Array.from({ length: 15 }, (_, i) =>
      prisma.teacher.create({
        data: {
          id: new ObjectId().toHexString(),
          username: `teacher${i + 1}`,
          name: `TName${i + 1}`,
          surname: `TSurname${i + 1}`,
          email: `teacher${i + 1}@example.com`,
          phone: `123-456-789${i + 1}`,
          address: `Address${i + 1}`,
          bloodType: 'A+',
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          subjects: { connect: { id: subjectIds[i % subjectIds.length] } },
          classes: { connect: { id: classIds[i % classIds.length] } },
          birthday: new Date(
            new Date().setFullYear(new Date().getFullYear() - 30)
          ),
        },
      })
    )
  )
  const teacherIds = teachers.map((t) => t.id)

  // LESSONS
  const lessons = await prisma.$transaction(
    Array.from({ length: 30 }, (_, i) =>
      prisma.lesson.create({
        data: {
          name: `Lesson${i + 1}`,
          day: Day[
            Object.keys(Day)[
              Math.floor(Math.random() * Object.keys(Day).length)
            ] as keyof typeof Day
          ],
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
          subjectId: subjectIds[i % subjectIds.length],
          classId: classIds[i % classIds.length],
          teacherId: teacherIds[i % teacherIds.length],
        },
      })
    )
  )
  const lessonIds = lessons.map((l) => l.id)

  // PARENTS
  const parents = await prisma.$transaction(
    Array.from({ length: 25 }, (_, i) =>
      prisma.parent.create({
        data: {
          id: new ObjectId().toHexString(),
          username: `parent${i + 1}`,
          name: `PName${i + 1}`,
          surname: `PSurname${i + 1}`,
          email: `parent${i + 1}@example.com`,
          phone: `123-456-789${i + 1}`,
          address: `Address${i + 1}`,
        },
      })
    )
  )
  const parentIds = parents.map((p) => p.id)

  // STUDENTS
  const students = await prisma.$transaction(
    Array.from({ length: 50 }, (_, i) =>
      prisma.student.create({
        data: {
          id: new ObjectId().toHexString(),
          username: `student${i + 1}`,
          name: `SName${i + 1}`,
          surname: `SSurname${i + 1}`,
          email: `student${i + 1}@example.com`,
          phone: `987-654-321${i + 1}`,
          address: `Address${i + 1}`,
          bloodType: 'O-',
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          parentId: parentIds[i % parentIds.length],
          gradeId: gradeIds[i % gradeIds.length],
          classId: classIds[i % classIds.length],
          birthday: new Date(
            new Date().setFullYear(new Date().getFullYear() - 10)
          ),
        },
      })
    )
  )
  const studentIds = students.map((s) => s.id)

  // ASSIGNMENTS
  const assignments = await prisma.$transaction(
    Array.from({ length: 10 }, (_, i) =>
      prisma.assignment.create({
        data: {
          title: `Assignment ${i + 1}`,
          startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          lessonId: lessonIds[i % lessonIds.length],
        },
      })
    )
  )

  // EXAMS
  const exams = await prisma.$transaction(
    Array.from({ length: 10 }, (_, i) =>
      prisma.exam.create({
        data: {
          title: `Exam ${i + 1}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          lessonId: lessonIds[i % lessonIds.length],
        },
      })
    )
  )
  const examIds = exams.map((e) => e.id)

  // RESULTS
  await prisma.$transaction(
    Array.from({ length: 10 }, (_, i) =>
      prisma.result.create({
        data: {
          score: 90,
          studentId: studentIds[i % studentIds.length],
          ...(i < 5
            ? { examId: examIds[i] }
            : { assignmentId: assignments[i - 5].id }),
        },
      })
    )
  )

  // ATTENDANCE
  await prisma.$transaction(
    Array.from({ length: 10 }, (_, i) =>
      prisma.attendance.create({
        data: {
          date: new Date(),
          present: true,
          studentId: studentIds[i % studentIds.length],
          lessonId: lessonIds[i % lessonIds.length],
        },
      })
    )
  )

  // ANNOUNCEMENTS & EVENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: classIds[i % classIds.length],
      },
    })

    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: classIds[i % classIds.length],
      },
    })
  }

  console.log('Seeding completed successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
