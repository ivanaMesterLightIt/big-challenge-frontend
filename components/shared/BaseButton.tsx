import { ButtonHTMLAttributes, FC } from 'react'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonClass: 'primary' | 'secondary'
}

export const BaseButton: FC<BaseButtonProps> = ({ buttonClass, ...props }) => {
  return (
    <button
      className={
        buttonClass === 'primary'
          ? 'inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          : 'inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      }
      {...props}>
      Button text
    </button>
  )
}
