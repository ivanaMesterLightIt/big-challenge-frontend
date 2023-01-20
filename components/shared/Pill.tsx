import { FC } from 'react'

interface PillProps {
  status: 'pending' | 'in progress' | 'done'
}

export const Pill: FC<PillProps> = ({ status }) => {
  return (
    <span
      className={
        status === 'done'
          ? 'inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800 capitalize'
          : status === 'in progress'
          ? 'inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800 capitalize'
          : 'inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800 capitalize'
      }>
      {status}
    </span>
  )
}
