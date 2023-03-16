import { useState, useEffect, PropsWithChildren, FC } from 'react'
import { useRouter } from 'next/router'

import { useMutation } from '@tanstack/react-query'
import { logoutUser } from '../api/user'
import toast from 'react-hot-toast'

const publicPaths = ['/login', '/sign-up', '/', '/email-verified']
const doctorPaths = ['/doctor-home', '/task-history', '/submission']
const patientPaths = [
  '/patient-home',
  '/new-submission',
  '/patient-info',
  '/submission',
]

const pathsByRole = {
  doctor: doctorPaths,
  patient: patientPaths,
  public: publicPaths,
}

function getRole(role: string | null) {
  if (role === 'doctor' || role === 'patient') {
    return role
  }
  return 'public'
}

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
    const path = url.split('?')[0]
    const pathToCheck = '/' + path.split('/')[1]
    const role = getRole(localStorage.getItem('role'))

    if (pathsByRole[role].includes(pathToCheck)) {
      setAuthorized(true)
    } else {
      setAuthorized(false)
      router.push({
        pathname: pathsByRole[role][0],
        query: role === 'public' ? { returnUrl: router.asPath } : {},
      })
    }
  }

  if (!authorized) {
    return <></>
  }

  return <>{children}</>
}
