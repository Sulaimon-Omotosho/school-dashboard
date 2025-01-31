'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'
import { subjectSchema, SubjectSchema } from '@/lib/formValidation'
import { createSubject, updateSubject } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const SubjectForm = ({
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
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  })

  const [state, formAction] = useFormState(
    type === 'create' ? createSubject : updateSubject,
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
      toast(`Subject has been ${type === 'create' ? 'created' : 'updated'}!`)
      setOpen(false)
      router.refresh()
    }
  }, [state])

  const { teachers } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>
        {type === 'create' ? 'Create a new Subject' : 'Update Subject'}
      </h1>
      <span className='text-xs text-gray-400 font-medium'>
        Authentication Information
      </span>

      <div className='flex justify-between flex-wrap gap-4'>
        <InputField
          label='Subject Name'
          name='name'
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
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
          <label className='text-xs text-gray-500'>Teachers</label>
          {teachers.length > 0 ? (
            <select
              multiple
              className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
              {...register('teachers')}
              defaultValue={data?.teachers}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.name + ' ' + teacher.surname}
                  </option>
                )
              )}
            </select>
          ) : (
            <p className='text-xs text-gray-500'>Loading teachers...</p>
          )}
          {errors.teachers?.message && (
            <p className='text-xs text-red-400'>
              {errors.teachers?.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className='text-red-500'>Something went wrong, Not Created!</span>
      )}
      <button className='bg-blue-400 text-white rounded-md p-2'>
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  )
}

export default SubjectForm
