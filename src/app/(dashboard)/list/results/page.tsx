import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { db } from '@/lib/db'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { getUserData } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type ResultList = {
  id: number
  title: string
  studentName: string
  studentSurname: string
  teacherName: string
  teacherSurname: string
  score: number
  classname: string
  startTime: Date
}

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams
  const p = page ? parseInt(page) : 1

  const { role, userId } = await getUserData()

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Student ',
      accessor: 'student',
    },
    {
      header: 'Score ',
      accessor: 'score',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Teacher',
      accessor: 'teacher',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Class',
      accessor: 'class',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Date',
      accessor: 'date',
      className: 'hidden md:table-cell',
    },
    ...(role === 'admin' || role === 'teacher'
      ? [
          {
            header: 'Actions',
            accessor: 'actions',
          },
        ]
      : []),
  ]

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>{item.title}</td>
      <td>{item.studentName + ' ' + item.studentSurname}</td>
      <td className='hidden md:table-cell'>{item.score}</td>
      <td className='hidden md:table-cell'>
        {item.teacherName + ' ' + item.teacherSurname}
      </td>
      <td className='hidden md:table-cell'>{item.classname}</td>
      <td className='hidden md:table-cell'>
        {new Intl.DateTimeFormat('en-US').format(item.startTime)}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {(role === 'admin' || role === 'teacher') && (
            <>
              <FormModal table='result' type='update' data={item} />
              <FormModal table='result' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )

  // URL PARAMS CONDITION

  const query: Prisma.ResultWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'studentId':
            query.studentId = value
            break
          case 'search':
            query.OR = [
              { exam: { title: { contains: value, mode: 'insensitive' } } },
              {
                assignment: { title: { contains: value, mode: 'insensitive' } },
              },
              { student: { name: { contains: value, mode: 'insensitive' } } },
            ]
            break
          default:
            break
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case 'admin':
      break
    case 'teacher':
      query.OR = [
        { exam: { lesson: { teacher: { is: { clerkId: userId! } } } } },
        { assignment: { lesson: { teacher: { is: { clerkId: userId! } } } } },
      ]
      break
    case 'student':
      query.student = { is: { clerkId: userId! } }
      break
    case 'parent':
      query.student = { parent: { is: { clerkId: userId! } } }
      break
    default:
      break
  }

  const [dataRes, count] = await db.$transaction([
    db.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.result.count({ where: query }),
  ])

  const data = dataRes.map((item) => {
    const assesment = item.exam || item.assignment

    if (!assesment) return null

    const isExam = 'startTime' in assesment

    return {
      id: item.id,
      title: assesment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assesment.lesson.teacher.name,
      teacherSurname: assesment.lesson.teacher.surname,
      score: item.score,
      classname: assesment.lesson.class.name,
      startTime: isExam ? assesment.startTime : assesment.startDate,
    }
  })

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Results</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full'>
              <Image
                src='/filter.png'
                alt='filter button'
                width={14}
                height={14}
              />
            </button>
            <button className='w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full'>
              <Image src='/sort.png' alt='sort button' width={14} height={14} />
            </button>
            {(role === 'admin' || role === 'teacher') && (
              <FormModal table='result' type='create' />
            )}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION  */}
      <Pagination page={p} count={count} />
    </div>
  )
}

export default ResultsListPage
