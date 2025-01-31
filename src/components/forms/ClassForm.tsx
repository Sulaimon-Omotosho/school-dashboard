'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'
import Image from 'next/image'
import { ClassSchema, classSchema } from '@/lib/formValidation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useFormState } from 'react-dom'
import { createClass, updateClass } from '@/lib/actions'

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: 'create' | 'update'
  data?: any
  setOpen: Dispatch<SetStateAction<boolean>>
  relatedData?: any
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  })

  const [state, formAction] = useFormState(
    type === 'create' ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  )

  const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    formAction(data)
  })

  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type === 'create' ? 'created' : 'updated'}!`)
      setOpen(false)
      router.refresh()
    }
  }, [state])

  const { teachers, grades } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>Create a new Class</h1>
      <span className='text-xs text-gray-400 font-medium'>
        Authentication Information
      </span>

      <div className='flex justify-between flex-wrap gap-4'>
        <InputField
          label='Class Name'
          name='name'
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label='Capacity'
          name='capacity'
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        {data && (
          <InputField
            label='Id'
            name='id'
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Supervisor</label>
          {teachers.length > 0 ? (
            <select
              className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
              {...register('supervisorId')}
              defaultValue={data?.teachers}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    value={teacher.id}
                    key={teacher.id}
                    selected={data && teacher.id === data.supervisorId}
                  >
                    {teacher.name + ' ' + teacher.surname}
                  </option>
                )
              )}
            </select>
          ) : (
            <p className='text-xs text-gray-500'>Loading teachers...</p>
          )}
          {errors.supervisorId?.message && (
            <p className='text-xs text-red-400'>
              {errors.supervisorId?.message.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Grade</label>
          {grades.length > 0 ? (
            <select
              className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
              {...register('gradeId')}
              defaultValue={data?.grade}
            >
              {grades.map((grade: { id: string; level: number }) => (
                <option
                  value={grade.id}
                  key={grade.id}
                  selected={data && grade.id === data.gradeId}
                >
                  {grade.level}
                </option>
              ))}
            </select>
          ) : (
            <p className='text-xs text-gray-500'>Loading Grades...</p>
          )}
          {errors.gradeId?.message && (
            <p className='text-xs text-red-400'>
              {errors.gradeId?.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className='bg-blue-400 text-white rounded-md p-2'>
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  )
}

export default ClassForm
