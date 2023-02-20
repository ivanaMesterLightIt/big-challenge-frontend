/* eslint-disable react/display-name */
import React, { TextareaHTMLAttributes } from 'react'

interface BaseTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const BaseTextArea = React.forwardRef<
  HTMLTextAreaElement,
  BaseTextAreaProps
>(({ label, name, ...props }, ref) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          ref={ref}
          name={name}
          id={name}
          className="block p-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...props}
        />
      </div>
    </div>
  )
})
