// import { Day, PrismaClient, UserSex } from '@prisma/client'
// import { ObjectId } from 'bson'

// const prisma = new PrismaClient()

// async function main() {
//   // ADMIN
//   await prisma.admin.createMany({
//     data: [
//       {
//         id: new ObjectId().toHexString(),
//         username: 'john_doe',
//         clerkId: 'clerk_john_doe',
//       },
//       {
//         id: new ObjectId().toHexString(),
//         username: 'jane_smith',
//         clerkId: 'clerk_jane_smith',
//       },
//     ],
//   })

//   // GRADES (1 to 6)
//   const grades = await prisma.$transaction(
//     Array.from({ length: 6 }, (_, i) =>
//       prisma.grade.create({
//         data: { id: new ObjectId().toHexString(), level: i + 1 },
//       })
//     )
//   )
//   const gradeIds = grades.map((g) => g.id)

//   // CLASSES
//   const classNames = ['1A', '1B', '2A', '2B', '3A', '3B']
//   const classes = await prisma.$transaction(
//     classNames.map((name, i) =>
//       prisma.class.create({
//         data: {
//           id: new ObjectId().toHexString(),
//           name,
//           gradeId: gradeIds[Math.floor(i / 2)],
//           capacity: Math.floor(Math.random() * 6) + 15,
//         },
//       })
//     )
//   )
//   const classIds = classes.map((c) => c.id)

//   // SUBJECTS
//   const subjectNames = [
//     'Mathematics',
//     'Science',
//     'English',
//     'History',
//     'Geography',
//     'Physics',
//     'Art',
//     'Chemistry',
//     'Biology',
//     'Physical Education',
//     'Music',
//     'Computer Science',
//     'Economics',
//     'Psychology',
//     'Philosophy',
//   ]
//   const subjects = await prisma.$transaction(
//     subjectNames.map((name) => prisma.subject.create({ data: { name } }))
//   )
//   const subjectIds = subjects.map((s) => s.id)

//   // TEACHERS
//   const teacherNames = [
//     'Michael Johnson',
//     'Emily Brown',
//     'Christopher Martinez',
//     'Jessica White',
//     'Daniel Lewis',
//     'Sophia Anderson',
//     'Matthew Thompson',
//     'Olivia Harris',
//     'Benjamin Carter',
//     'Mia Rodriguez',
//     'William Hall',
//     'Isabella Moore',
//     'James Walker',
//     'Charlotte Adams',
//     'Ethan Nelson',
//   ]
//   const teachers = await prisma.$transaction(
//     teacherNames.map((name, i) => {
//       const [firstName, lastName] = name.split(' ')
//       return prisma.teacher.create({
//         data: {
//           id: new ObjectId().toHexString(),
//           username: firstName.toLowerCase() + i,
//           name: firstName,
//           surname: lastName,
//           email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.com`,
//           phone: `555-123-${1000 + i}`,
//           address: `123 ${lastName} St, City`,
//           bloodType: 'O+',
//           sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
//           clerkId: `clerk_teacher_${firstName.toLowerCase()}`,
//           subjects: { connect: { id: subjectIds[i % subjectIds.length] } },
//           classes: { connect: { id: classIds[i % classIds.length] } },
//           birthday: new Date(
//             new Date().setFullYear(new Date().getFullYear() - (30 + i))
//           ),
//         },
//       })
//     })
//   )
//   const teacherIds = teachers.map((t) => t.id)

//   // PARENTS
//   const parentNames = [
//     'Robert Evans',
//     'Laura Mitchell',
//     'David Wright',
//     'Sarah Cooper',
//     'Brian Murphy',
//     'Lisa Sanders',
//     'Kevin Brooks',
//     'Nancy Foster',
//     'George Ward',
//     'Karen Price',
//     'Thomas King',
//     'Betty Perez',
//     'Edward Collins',
//     'Sandra Hughes',
//     'Timothy Butler',
//     'Dorothy Ross',
//     'Steven Stewart',
//     'Rebecca Barnes',
//     'Scott Henderson',
//     'Martha Powell',
//     'Gregory Gray',
//     'Janice Long',
//     'Patrick Patterson',
//     'Catherine Ramirez',
//     'Frank Reed',
//   ]
//   const parents = await prisma.$transaction(
//     parentNames.map((name, i) => {
//       const [firstName, lastName] = name.split(' ')
//       return prisma.parent.create({
//         data: {
//           id: new ObjectId().toHexString(),
//           username: firstName.toLowerCase() + i,
//           name: firstName,
//           surname: lastName,
//           email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@parent.com`,
//           phone: `555-789-${3000 + i}`,
//           address: `789 ${lastName} St, City`,
//           clerkId: `clerk_parent_${firstName.toLowerCase()}`,
//         },
//       })
//     })
//   )
//   const parentIds = parents.map((p) => p.id)
//   // STUDENTS
//   const studentNames = [
//     'Liam Scott',
//     'Emma Watson',
//     'Noah Davis',
//     'Ava Wilson',
//     'Olivia Harris',
//     'Sophia Lee',
//     'Lucas Brown',
//     'Mason Clark',
//     'Isabella King',
//     'Logan Carter',
//     'Charlotte Davis',
//     'Amelia Scott',
//     'James Walker',
//     'Benjamin Turner',
//     'Emily Carter',
//     'Ethan Lewis',
//     'Mia Perez',
//     'Alexander Young',
//     'William White',
//     'Zoe Adams',
//     'Grace Mitchell',
//     'Harper Morgan',
//     'Sebastian Cooper',
//     'Madison Collins',
//     'Leo Harris',
//     'Chloe Evans',
//     'Jackson Moore',
//     'Lily Green',
//     'Jack Harris',
//     'Victoria King',
//     'Jacob Robinson',
//     'Ella Carter',
//     'Henry Thomas',
//     'Sofia Anderson',
//     'Nathan Ward',
//     'Madeline Lewis',
//     'Daniel Roberts',
//     'Avery Martinez',
//     'Matthew Parker',
//     'Scarlett Evans',
//     'Elijah Ross',
//     'Jack Campbell',
//     'Aiden Bennett',
//     'Hannah Carter',
//     'Joshua Walker',
//     'Landon Bell',
//     'Layla Harris',
//     'Samantha Walker',
//     'Owen Brooks',
//     'Jackson Gray',
//   ]

//   const students = await prisma.$transaction(
//     studentNames.map((name, i) => {
//       const [firstName, lastName] = name.split(' ')
//       return prisma.student.create({
//         data: {
//           id: new ObjectId().toHexString(),
//           username: firstName.toLowerCase() + i,
//           name: firstName,
//           surname: lastName,
//           email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.com`,
//           phone: `555-456-${2000 + i}`,
//           address: `456 ${lastName} St, City`,
//           bloodType: 'A-',
//           sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
//           clerkId: `clerk_student_${firstName.toLowerCase()}_${i}`,
//           parentId: parentIds[i % parentIds.length],
//           gradeId: gradeIds[i % gradeIds.length],
//           classId: classIds[i % classIds.length],
//           birthday: new Date(
//             new Date().setFullYear(new Date().getFullYear() - (10 + i))
//           ),
//         },
//       })
//     })
//   )

//   // LESSONS
//   await prisma.lesson.createMany({
//     data: Array.from({ length: 30 }, (_, i) => {
//       // Generate a random hour between 8 and 15 (8:00 AM to 3:00 PM)
//       const startHour = Math.floor(Math.random() * 8) + 8 // Random hour between 8 and 15
//       const startMinute = Math.floor(Math.random() * 60) // Random minute between 0 and 59

//       // Create a Date object for start time (randomized hour and minute)
//       const startTime = new Date()
//       startTime.setHours(startHour, startMinute, 0, 0)

//       // End time is 1 hour later
//       const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)

//       return {
//         name: `Lesson ${i + 1}`,
//         day: Object.values(Day)[i % Object.values(Day).length],
//         startTime,
//         endTime,
//         subjectId: subjectIds[i % subjectIds.length],
//         classId: classIds[i % classIds.length],
//         teacherId: teacherIds[i % teacherIds.length],
//       }
//     }),
//   })
//   const lessonIds = lessons.map((l) => l.id)

//   // ASSIGNMENTS
//   await prisma.assignment.createMany({
//     data: Array.from({ length: 20 }, (_, i) => ({
//       title: `Assignment ${i + 1}`,
//       startDate: new Date(),
//       dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
//       lessonId: lessonIds[i % lessonIds.length],
//     })),
//   })

//   // EXAMS
//   await prisma.exam.createMany({
//     data: Array.from({ length: 23 }, (_, i) => ({
//       title: `Exam ${i + 1}`,
//       startTime: new Date(),
//       endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
//       lessonId: lessonIds[i % lessonIds.length],
//     })),
//   })

//   // RESULTS
//   await prisma.result.createMany({
//     data: students.map((student, i) => ({
//       score: Math.floor(Math.random() * 100),
//       studentId: student.id,
//     })),
//   })

//   // ATTENDANCE
//   await prisma.attendance.createMany({
//     data: Array.from({ length: 18 }, (_, i) => ({
//       date: new Date(),
//       present: Math.random() > 0.1,
//       studentId: students[i % students.length].id,
//       lessonId: lessonIds[i % lessonIds.length],
//     })),
//   })

//   // EVENTS
//   await prisma.event.createMany({
//     data: Array.from({ length: 18 }, (_, i) => ({
//       title: `Event ${i + 1}`,
//       description: 'Annual school event',
//       startTime: new Date(),
//       endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
//       classId: classIds[i % classIds.length],
//     })),
//   })

//   // ANNOUNCEMENTS
//   await prisma.announcement.createMany({
//     data: Array.from({ length: 15 }, (_, i) => ({
//       title: `Announcement ${i + 1}`,
//       description: 'Detailed description of the school announcement.',
//       date: new Date(),
//     })),
//   })

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
