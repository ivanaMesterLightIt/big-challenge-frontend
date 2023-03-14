import { FC } from 'react'
import { Oval } from 'react-loader-spinner'

interface BackButtonProps {
    isVisible: boolean
    size: number
    wrapperStyle: {}
}

export const Loader: FC<BackButtonProps> = ({ isVisible = false, size, wrapperStyle }) => {
  return (
    <Oval
      height={size}
      width={size}
      color="#2563EB"
      wrapperStyle={wrapperStyle}
      wrapperClass=""
      visible={isVisible}
      ariaLabel="oval-loading"
      secondaryColor="#E0F2FE"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}
