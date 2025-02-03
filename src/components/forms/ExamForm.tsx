'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'
import { examSchema, ExamSchema } from '@/lib/formValidation'
import { createExam, updateExam } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const ExamForm = ({
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
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  })

  const [state, formAction] = useFormState(
    type === 'create' ? createExam : updateExam,
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
      toast(`Exam has been ${type === 'create' ? 'created' : 'updated'}!`)
      setOpen(false)
      router.refresh()
    }
  }, [state])

  const { lessons } = relatedData

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
          label='Exam Title'
          name='title'
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label='Start Time'
          name='startTime'
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type='datetime-local'
        />
        <InputField
          label='End Time'
          name='endTime'
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type='datetime-local'
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
          <label className='text-xs text-gray-500'>Lesson</label>
          {lessons.length > 0 ? (
            <select
              multiple
              className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
              {...register('lessonId')}
              defaultValue={data?.lessonId}
            >
              {lessons.map((lesson: { id: string; name: string }) => (
                <option value={lesson.id} key={lesson.id}>
                  {lesson.name}
                </option>
              ))}
            </select>
          ) : (
            <p className='text-xs text-gray-500'>Loading teachers...</p>
          )}
          {errors.lessonId?.message && (
            <p className='text-xs text-red-400'>
              {errors.lessonId?.message.toString()}
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

export default ExamForm
