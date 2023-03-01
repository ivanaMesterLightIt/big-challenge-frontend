import { FC, PropsWithChildren } from 'react'
import { tw } from '../../utils/tw'
import {
  HomeIcon,
  InboxIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUser, logoutUser } from '../../api/user'
import Link from 'next/link'
import toast from 'react-hot-toast'

const patientNavigation = [
  { name: 'Home', href: '/patient-home', icon: HomeIcon },
  { name: 'New submission', href: '/new-submission', icon: PlusCircleIcon },
]

const doctorNavigation = [
  { name: 'Home', href: '/doctor-home', icon: HomeIcon },
  { name: 'Task history', href: '/task-history', icon: InboxIcon },
]

export interface MainLayoutProps {
  userType: 'DOCTOR' | 'PATIENT'
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  userType,
}) => {
  const router = useRouter()
  const navigation =
    userType === 'DOCTOR' ? doctorNavigation : patientNavigation

  const { data: userLoggedIn } = useQuery(['getUser'], getUser)

  const userName = userLoggedIn?.name

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem('token')
      router.push('/login')
    },
    onError: () => {
      toast.error('Sorry, there was a problem logging out', {
        position: 'top-right',
      })
    },
  })

  return (
    <>
      <div>
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <nav className="mt-4 flex-1 space-y-1 px-2">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={tw(
                      item.href === router.asPath
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}>
                    <item.icon
                      className={tw(
                        item.href === router.asPath
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <Link
                href="/patient-info"
                className={tw(
                  userLoggedIn?.roles[0].name === 'doctor'
                    ? 'group block w-full flex-shrink-0 cursor-default'
                    : 'group block w-full flex-shrink-0',
                )}
                onClick={e => {
                  if (userLoggedIn?.roles[0].name === 'doctor') {
                    e.preventDefault()
                  }
                }}>
                <div className="flex items-center">
                  <div className="relative rounded-full h-8 w-8 bg-gray-400">
                    <span className="text-white text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {userName?.slice(0, 1)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">{userName}</p>
                    <button
                      className="text-xs text-gray-300 group-hover:underline"
                      onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        mutate()
                      }}>
                      Sign out
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
