'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'
import { subjectSchema, SubjectSchema } from '@/lib/formValidation'
import { createSubject } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const SubjectForm = ({
  type,
  data,
  setOpen,
}: {
  type: 'create' | 'update'
  data?: any
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  })

  const [state, formAction] = useFormState(createSubject, {
    success: false,
    error: false,
  })

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
      </div>
      {state.error && <span className='text-red-500'>Not Created!</span>}
      <button className='bg-blue-400 text-white rounded-md p-2'>
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  )
}

export default SubjectForm
