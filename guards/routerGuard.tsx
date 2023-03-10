import { useState, useEffect, PropsWithChildren, FC } from 'react'
import { useRouter } from 'next/router'

import { useMutation } from '@tanstack/react-query'
import { logoutUser } from '../api/user'
import toast from 'react-hot-toast'

export const RouteGuard: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem('token')
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  useEffect(() => {
    authCheck(router.asPath)

    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  function authCheck(url: string) {
    const publicPaths = ['/login', '/sign-up', '/']
    const doctorPaths = ['/doctor-home', '/task-history', '/submission']
    const patientPaths = [
      '/patient-home',
      '/new-submission',
      '/patient-info',
      '/submission',
    ]
    const path = url.split('?')[0]
    const pathToCheck = '/' + path.split('/')[1]
    if (
      localStorage.getItem('token') === null &&
      !publicPaths.includes(pathToCheck)
    ) {
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    } else if (
      !publicPaths.includes(pathToCheck) &&
      localStorage.getItem('token') !== null &&
      ((localStorage.getItem('role') === 'doctor' &&
        !doctorPaths.includes(pathToCheck)) ||
        (localStorage.getItem('role') === 'patient' &&
          !patientPaths.includes(pathToCheck)))
    ) {
      mutate()
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}
