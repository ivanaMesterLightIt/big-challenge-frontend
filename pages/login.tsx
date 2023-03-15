/* eslint-disable react/no-unescaped-entities */

import { useForm } from 'react-hook-form'
import { BaseButton } from '../components/shared/BaseButton'
import { BaseInput } from '../components/shared/BaseInput'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api/user'
import { z } from 'Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { showError } from '../utils/showError'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export type FormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.roles[0].name)
      if (data.user.roles[0].name === 'doctor') {
        const returnUrl = router.query.returnUrl?.toString() || '/doctor-home'
        router.push(returnUrl)
      } else {
        const returnUrl = router.query.returnUrl?.toString() || '/patient-home'
        router.push(returnUrl)
      }
    },
    onError: e => showError(e, 'loginUser'),
  })

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[320px]">
        <div className="w-full py-3 mb-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">
            Welcome to the doctor's app
          </h1>
          <span className="mt-3 text-sm">Log in to access unique features</span>
        </div>
        <form onSubmit={handleSubmit(data => mutate(data))}>
          <div className="w-full flex flex-row items-center justify-between">
            <BaseInput
              label="Email"
              error={errors.email}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className="w-full my-4 flex flex-row items-center justify-between">
            <BaseInput
              label="Password"
              type="password"
              error={errors.password}
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className="mt-6 w-full px-3">
            <BaseButton
              buttonClass="primary"
              text="Log in"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
        <div className="mt-10 flex flex-row items-center justify-center text-sm">
          <span className="text-gray-500 mr-1">Don't have an account yet?</span>
          <a
            onClick={() => {
              router.push('/sign-up')
            }}
            className="text-blue-600 hover:underline cursor-pointer">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
