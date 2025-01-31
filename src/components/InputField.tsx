import { InputFieldProps } from '@/lib/types'
import React from 'react'

const InputField = ({
  label,
  type = 'text',
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? 'hidden' : 'flex flex-col gap-2 w-full md:w-1/4'}>
      <label className='text-xs text-gray-500' htmlFor=''>
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className='ring-[1.5px] rounded-md ring-gray-300 p-2 text-sm w-full'
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className='text-xs text-red-400'>{error?.message.toString()}</p>
      )}
    </div>
  )
}

export default InputField
