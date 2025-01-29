import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const UserCard = async ({
  type,
}: {
  type: 'admin' | 'teacher' | 'student' | 'parent'
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: db.admin,
    teacher: db.teacher,
    student: db.student,
    parent: db.parent,
  }

  const data = await modelMap[type]?.count()

  return (
    <div className='rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1'>
      <div className='flex justify-between items-center'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>
          2024/2025
        </span>
        <Image src='/more.png' alt='more' width={20} height={20} />
      </div>
      <h1 className='text-2cl font-semibold my-4'>{data}</h1>
      <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  )
}

export default UserCard
