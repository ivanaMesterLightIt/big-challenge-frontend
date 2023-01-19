import { FC } from 'react'

interface BaseTextAreaProps {
  label: string
  name: string
  defaultValue?: string
  rows: number
  placeholder?: string
}

export const BaseTextArea: FC<BaseTextAreaProps> = ({
  label,
  name,
  defaultValue = '',
  rows,
  placeholder = '',
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={rows}
          name={name}
          id={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
