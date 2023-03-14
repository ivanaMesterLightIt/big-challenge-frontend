import { ButtonHTMLAttributes, FC } from 'react'
import { tw } from '../../utils/tw'
import { Loader } from './Loader'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonClass: 'primary' | 'secondary'
  text: string
  isLoading?: boolean
}

export const BaseButton: FC<BaseButtonProps> = ({
  buttonClass,
  text,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      className={tw(
        'relative inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        buttonClass === 'primary' &&
          ' bg-blue-600 text-white shadow-sm hover:bg-blue-700',
        buttonClass !== 'primary' &&
          ' bg-blue-100 text-blue-700 hover:bg-indigo-200',
      )}
      {...props}>
      {text}
      <Loader
        size={20}
        isVisible={isLoading}
        wrapperStyle={{
          marginLeft: '10px',
          position: 'absolute',
          right: '10px',
        }}
      />
    </button>
  )
}
