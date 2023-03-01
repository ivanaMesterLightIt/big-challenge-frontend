import { useRouter } from 'next/router'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function EmailVerifiedPage() {
  const router = useRouter()

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className='flex flex-row items-center justify-start'>
      <h1 className="text-xl text-center font-semibold">
        Your email was successfully verified
      </h1>
      <CheckCircleIcon className='text-emerald-300 h-7 w-7 ml-2'/>
      </div>
      <div className="mt-4 flex flex-row items-center justify-center text-sm">
        <span className="text-gray-500 mr-1">Click here to </span>
        <a
          onClick={() => {
            router.push('/sign-up')
          }}
          className="text-blue-600 hover:underline cursor-pointer">
          login
        </a>
      </div>
    </div>
  )
}
