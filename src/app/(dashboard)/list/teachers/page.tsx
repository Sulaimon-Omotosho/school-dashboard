import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { db } from '@/lib/db'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { getUserData } from '@/lib/utils'
import { Class, Prisma, Subject, Teacher } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TeachersList = Teacher & { subjects: Subject[] } & { classes: Class[] }

const TeachersListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams
  const p = page ? parseInt(page) : 1

  const { role, userId } = await getUserData()

  const columns = [
    {
      header: 'Info',
      accessor: 'info',
    },
    {
      header: 'Teacher ID',
      accessor: 'teacherId',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Subjects',
      accessor: 'subjects',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Classes',
      accessor: 'classes',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Phone',
      accessor: 'phone',
      className: 'hidden lg:table-cell',
    },
    {
      header: 'Address',
      accessor: 'address',
      className: 'hidden lg:table-cell',
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

  const renderRow = (item: TeachersList) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>
        <Image
          src={item.img || '/noAvatar.png'}
          alt='image'
          width={40}
          height={40}
          className='md:hidden xl:block w-10 h-10 rounded-full object-fit'
        />
        <div className='flex flex-col '>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item?.email}</p>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.username}</td>
      <td className='hidden md:table-cell'>
        {item.subjects.map((subject) => subject.name).join(',')}
      </td>
      <td className='hidden md:table-cell'>
        {item.classes.map((classItem) => classItem.name).join(',')}
      </td>
      <td className='hidden lg:table-cell'>{item.phone}</td>
      <td className='hidden lg:table-cell'>{item.address}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/teachers/${item.id}`}>
            <button className='flex items-center justify-center rounded-full bg-lamaSky'>
              <Image src='/view.png' width={16} height={16} alt='view' />
            </button>
          </Link>
          {role === 'admin' && (
            <FormContainer table='teacher' type='delete' id={item.id} />
          )}
        </div>
      </td>
    </tr>
  )

  // URL PARAMS CONDITION

  const query: Prisma.TeacherWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            query.lesson = {
              some: {
                classId: value,
              },
            }
            break
          case 'search':
            query.name = { contains: value, mode: 'insensitive' }
            break
          default:
            break
        }
      }
    }
  }

  const [data, count] = await db.$transaction([
    db.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.teacher.count({ where: query }),
  ])

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Teachers</h1>
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
            {role === 'admin' && (
              <FormContainer table='teacher' type='create' />
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

export default TeachersListPage
