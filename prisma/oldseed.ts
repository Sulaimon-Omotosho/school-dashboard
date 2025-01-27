// import { Day, PrismaClient, UserSex } from '@prisma/client'
// import { ObjectId } from 'bson'

// const prisma = new PrismaClient()

// async function main() {
//   // ADMIN
//   const admin1 = await prisma.admin.create({
//     data: {
//       id: new ObjectId().toHexString(),
//       username: 'admin1',
//     },
//   })
//   const admin2 = await prisma.admin.create({
//     data: {
//       id: new ObjectId().toHexString(),
//       username: 'admin2',
//     },
//   })

//   // GRADE
//   const gradeIds = []
//   for (let i = 1; i <= 6; i++) {
//     const grade = await prisma.grade.create({
//       data: {
//         id: new ObjectId().toHexString(),
//         level: i,
//       },
//     })
//     gradeIds.push(grade.id)
//   }

//   // CLASS
//   const classIds = []
//   for (const gradeId of gradeIds) {
//     const createdClass = await prisma.class.create({
//       data: {
//         id: new ObjectId().toHexString(),
//         name: `${gradeIds.indexOf(gradeId) + 1}A`,
//         gradeId: gradeId,
//         capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
//       },
//     })
//     classIds.push(createdClass.id)
//   }

//   // SUBJECTS
//   const subjectData = [
//     'Mathematics',
//     'Science',
//     'English',
//     'History',
//     'Geography',
//     'Physics',
//     'Chemistry',
//     'Biology',
//     'Computer Science',
//     'Art',
//   ].map((name) => ({ name }))

//   const createdSubjects = await prisma.$transaction(
//     subjectData.map((subject) => prisma.subject.create({ data: subject }))
//   )
//   const subjectIds = createdSubjects.map((s) => s.id)

//   // TEACHERS
//   const teacherIds = []
//   for (let i = 1; i <= 15; i++) {
//     const teacher = await prisma.teacher.create({
//       data: {
//         id: new ObjectId().toHexString(),
//         username: `teacher${i}`,
//         name: `TName${i}`,
//         surname: `TSurname${i}`,
//         email: `teacher${i}@example.com`,
//         phone: `123-456-789${i}`,
//         address: `Address${i}`,
//         bloodType: 'A+',
//         sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
//         subjects: { connect: { id: subjectIds[i % subjectIds.length] } }, // Connect with existing subjects
//         classes: { connect: { id: classIds[i % classIds.length] } }, // Connect with existing classes
//         birthday: new Date(
//           new Date().setFullYear(new Date().getFullYear() - 30)
//         ),
//       },
//     })
//     teacherIds.push(teacher.id)
//   }

//   // LESSONS
//   for (let i = 1; i <= 30; i++) {
//     await prisma.lesson.create({
//       data: {
//         name: `Lesson${i}`,
//         day: Day[
//           Object.keys(Day)[
//             Math.floor(Math.random() * Object.keys(Day).length)
//           ] as keyof typeof Day
//         ],
//         startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
//         endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
//         subjectId: subjectIds[i % subjectIds.length],
//         classId: classIds[i % classIds.length],
//         teacherId: teacherIds[i % teacherIds.length],
//       },
//     })
//   }

//   // PARENTS
//   const parentIds = []
//   for (let i = 1; i <= 25; i++) {
//     const parent = await prisma.parent.create({
//       data: {
//         id: new ObjectId().toHexString(),
//         username: `parent${i}`,
//         name: `PName${i}`,
//         surname: `PSurname${i}`,
//         email: `parent${i}@example.com`,
//         phone: `123-456-789${i}`,
//         address: `Address${i}`,
//       },
//     })
//     parentIds.push(parent.id)
//   }

//   // STUDENTS
//   for (let i = 1; i <= 50; i++) {
//     await prisma.student.create({
//       data: {
//         id: new ObjectId().toHexString(),
//         username: `student${i}`,
//         name: `SName${i}`,
//         surname: `SSurname${i}`,
//         email: `student${i}@example.com`,
//         phone: `987-654-321${i}`,
//         address: `Address${i}`,
//         bloodType: 'O-',
//         sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
//         parentId: parentIds[i % parentIds.length],
//         gradeId: gradeIds[i % gradeIds.length],
//         classId: classIds[i % classIds.length],
//         birthday: new Date(
//           new Date().setFullYear(new Date().getFullYear() - 10)
//         ),
//       },
//     })
//   }

//   // EXAMS
//   for (let i = 1; i <= 10; i++) {
//     await prisma.exam.create({
//       data: {
//         title: `Exam ${i}`,
//         startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
//         endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
//         lessonId: classIds[i % classIds.length], // Assign to existing lesson
//       },
//     })
//   }

//   // ANNOUNCEMENTS & EVENTS
//   for (let i = 1; i <= 5; i++) {
//     await prisma.announcement.create({
//       data: {
//         title: `Announcement ${i}`,
//         description: `Description for Announcement ${i}`,
//         date: new Date(),
//         classId: classIds[i % classIds.length],
//       },
//     })

//     await prisma.event.create({
//       data: {
//         title: `Event ${i}`,
//         description: `Description for Event ${i}`,
//         startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
//         endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
//         classId: classIds[i % classIds.length],
//       },
//     })
//   }

//   console.log('Seeding completed successfully.')
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
