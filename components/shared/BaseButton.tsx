import { ButtonHTMLAttributes, FC } from 'react'
import { tw } from '../../utils/tw'
import { Oval } from 'react-loader-spinner'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonClass: 'primary' | 'secondary'
  text: string
  isLoading?: boolean
}

export const BaseButton: FC<BaseButtonProps> = ({ buttonClass, text, isLoading = false, ...props }) => {
  return (
    <button
      className={
        tw(buttonClass === 'primary'
          ? 'relative inline-flex items-center justify-center w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          : 'relative inline-flex items-center justify-center w-full rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2')
      }
      {...props}>
      { text }
      <Oval
        height={20}
        width={20}
        color="#2563EB"
        wrapperStyle={{marginLeft: '10px', position: 'absolute', right: '10px' }}
        wrapperClass=""
        visible={isLoading}
        ariaLabel="oval-loading"
        secondaryColor="#E0F2FE"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </button>
  )
}
