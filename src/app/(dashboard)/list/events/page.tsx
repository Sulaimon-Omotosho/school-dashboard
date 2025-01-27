import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { eventsData, role } from '@/lib/data'
import { db } from '@/lib/db'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { Class, Event, Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type EventList = Event & { class: Class }

const columns = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'Class ',
    accessor: 'class',
  },
  {
    header: 'Date ',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Start Time',
    accessor: 'startTime',
    className: 'hidden md:table-cell',
  },
  {
    header: 'End Time',
    accessor: 'endTime',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
  >
    <td className='flex items-center gap-4 p-4'>{item.title}</td>
    <td>{item.class.name}</td>
    <td className='hidden md:table-cell'>
      {new Intl.DateTimeFormat('en-US').format(item.startTime)}
    </td>
    <td className='hidden md:table-cell'>
      {item.startTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })}
    </td>
    <td className='hidden md:table-cell'>
      {' '}
      {item.endTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })}
    </td>
    <td>
      <div className='flex items-center gap-2'>
        {role === 'admin' && (
          <>
            <FormModal table='event' type='update' data={item} />
            <FormModal table='event' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
)

const EventsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams
  const p = page ? parseInt(page) : 1

  // URL PARAMS CONDITION

  const query: Prisma.EventWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.title = { contains: value, mode: 'insensitive' }
            break
          default:
            break
        }
      }
    }
  }

  const [data, count] = await db.$transaction([
    db.event.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.event.count({ where: query }),
  ])

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Events</h1>
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
            {role === 'admin' && <FormModal table='event' type='create' />}
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

export default EventsListPage
