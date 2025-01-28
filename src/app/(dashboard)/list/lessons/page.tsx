import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { db } from '@/lib/db'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { getUserData } from '@/lib/utils'
import { Class, Lesson, Prisma, Subject, Teacher } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type LessonList = Lesson & { class: Class } & { teacher: Teacher } & {
  subject: Subject
}

const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams
  const p = page ? parseInt(page) : 1

  const { role, userId } = await getUserData()

  const columns = [
    {
      header: 'Subject Name',
      accessor: 'subject',
    },
    {
      header: 'class ',
      accessor: 'class',
    },
    {
      header: 'Teacher',
      accessor: 'teacher',
      className: 'hidden md:table-cell',
    },
    ...(role === 'admin'
      ? [
          {
            header: 'Actions',
            accessor: 'actions',
          },
        ]
      : []),
  ]

  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className='hidden md:table-cell'>
        {item.teacher.name + ' ' + item.teacher.surname}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal table='lesson' type='update' data={item} />
              <FormModal table='lesson' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )

  // URL PARAMS CONDITION

  const query: Prisma.LessonWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            query.classId = value
            break
          case 'teacherId':
            query.teacherId = value
            break
          case 'search':
            query.OR = [
              { subject: { name: { contains: value, mode: 'insensitive' } } },
              { teacher: { name: { contains: value, mode: 'insensitive' } } },
            ]
            break
          default:
            break
        }
      }
    }
  }

  const [data, count] = await db.$transaction([
    db.lesson.findMany({
      where: query,
      include: {
        teacher: { select: { name: true, surname: true } },
        class: { select: { name: true } },
        subject: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.lesson.count({ where: query }),
  ])

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Lessons</h1>
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
            {role === 'admin' && <FormModal table='lesson' type='create' />}
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

export default LessonsListPage
