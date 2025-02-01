'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'
import Image from 'next/image'
import { teacherSchema, TeacherSchema } from '@/lib/formValidation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useFormState } from 'react-dom'
import { createTeacher, updateTeacher } from '@/lib/actions'
import { CldUploadWidget } from 'next-cloudinary'

const TeacherForm = ({
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
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  })

  const [img, setImg] = useState<any>()

  const [state, formAction] = useFormState(
    type === 'create' ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  )

  const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    formAction({ ...data, img: img?.secure_url })
  })

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === 'create' ? 'created' : 'updated'}!`)
      setOpen(false)
      router.refresh()
    }
  }, [state])

  const { subjects } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>
        {type === 'create' ? 'Create a new Teacher' : 'Update Teacher'}
      </h1>
      <span className='text-xs text-gray-400 font-medium'>
        Authentication Information
      </span>

      <div className='flex justify-between flex-wrap gap-4'>
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
        {data && (
          <InputField
            label='ClerkId'
            name='clerkId'
            defaultValue={data?.clerkId}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <InputField
          label='Username'
          name='username'
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label='Email'
          name='email'
          type='email'
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label='Password'
          name='password'
          type='password'
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className='text-xs text-gray-400 font-medium'>
        Personal Information
      </span>
      <div className='flex justify-between flex-wrap gap-4'>
        <InputField
          label='Name'
          name='name'
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label='Surname'
          name='surname'
          defaultValue={data?.surname}
          register={register}
          error={errors?.surname}
        />
        <InputField
          label='Phone'
          name='phone'
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label='Address'
          name='address'
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label='Blood Type'
          name='bloodType'
          defaultValue={data?.bloodType}
          register={register}
          error={errors?.bloodType}
        />
        <InputField
          label='Birthday'
          name='birthday'
          type='date'
          defaultValue={data?.birthday.toISOString().split('T')[0]}
          register={register}
          error={errors?.birthday}
        />
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Sex</label>
          <select
            className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
            {...register('sex')}
            defaultValue={data?.sex}
          >
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
          </select>
          {errors.sex?.message && (
            <p className='text-xs text-red-400'>
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Subjects</label>
          {subjects.length > 0 ? (
            <select
              multiple
              className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
              {...register('subjects')}
              defaultValue={data?.subjects}
            >
              {subjects.map((subject: { id: string; name: string }) => (
                <option value={subject.id} key={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          ) : (
            <p className='text-xs text-gray-500'>Loading subjects...</p>
          )}
          {errors.subjects?.message && (
            <p className='text-xs text-red-400'>
              {errors.subjects?.message.toString()}
            </p>
          )}
        </div>
        <CldUploadWidget
          uploadPreset='schoolDashboard'
          onSuccess={(result, { widget }) => {
            setImg(result.info)
            widget.close()
          }}
        >
          {({ open }) => {
            return (
              <label
                className='text-xs text-gray-500 flex flex-col items-center gap-2 cursor-pointer justify-center'
                onClick={() => open()}
              >
                {!img ? (
                  <Image src='/upload.png' alt='icon' width={28} height={28} />
                ) : (
                  <Image
                    src={img?.secure_url}
                    alt='Uploaded Img'
                    width={150}
                    height={250}
                  />
                )}
                <span className=''>Upload a photo</span>
              </label>
            )
          }}
        </CldUploadWidget>
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

export default TeacherForm
