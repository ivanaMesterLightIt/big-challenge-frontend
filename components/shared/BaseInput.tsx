import { FC, InputHTMLAttributes } from 'react'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string | boolean | { message?: string }
  errorMessage?: string
}

export const BaseInput: FC<BaseInputProps> = ({ label, name, error = false, errorMessage, ...props }) => {
  return (
    <div className='w-full px-3'>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          name={name}
          id={name}
          className="block w-full rounded-md py-2 px-1 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          {...props}
        />
      </div>
      <div className='h-4'>
        {
          !!error && <span className='text-red-500 text-xs'>{errorMessage}</span>
        }
      </div>
    </div>
  )
}
