import { ButtonHTMLAttributes, FC } from 'react'
import { tw } from '../../utils/tw'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonClass: 'primary' | 'secondary'
  text: string
}

export const BaseButton: FC<BaseButtonProps> = ({ buttonClass, text, ...props }) => {
  return (
    <button
      className={
        tw(buttonClass === 'primary'
          ? 'inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          : 'inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2')
      }
      {...props}>
      { text }
    </button>
  )
}
