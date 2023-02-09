/* eslint-disable react/no-unescaped-entities */

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { BaseButton } from '../components/shared/BaseButton'
import { BaseInput } from '../components/shared/BaseInput'
import { registerUser, NewUser } from '../api/user/register'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { z } from 'Zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'Invalid password',
      }),
    repeatPassword: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'Invalid password',
      }),
  })
  .refine(data => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: "Password don't match",
  })

export type FormValues = z.infer<typeof registerSchema>

export default function SignUpPage() {
  const router = useRouter()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(registerSchema) })

  const [typeDoctor, setTypeDoctor] = useState(true)

  const getRegisterData = (data: FormValues) => {
    const newUserData: NewUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      user_type: typeDoctor ? 'DOCTOR' : 'PATIENT',
    }
    return newUserData
  }

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push('/login')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate(getRegisterData(data))
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[664px]">
        <div className="w-full py-3 mb-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">
            Welcome to the doctor's app
          </h1>
          <span className="mt-3 text-sm">
            Sign up to access unique features
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-row items-center justify-between">
            <BaseInput
              label="Name"
              error={errors.name}
              errorMessage={errors.name?.message}
              {...register('name')}
            />
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
            <BaseInput
              label="Repeat Password"
              type="password"
              error={errors.repeatPassword}
              errorMessage={errors.repeatPassword?.message}
              {...register('repeatPassword')}
            />
          </div>
          <label className="px-3 pb-1 block text-sm font-medium text-gray-700">
            User type
          </label>
          <div className="flex flex-row items-center justify-between px-3">
            <div className="flex items-center w-full border border-gray-300 rounded-l p-3">
              <input
                id="DOCTOR"
                name="userType"
                type="radio"
                defaultChecked={true}
                checked={typeDoctor}
                onChange={() => setTypeDoctor(!typeDoctor)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                Doctor
              </label>
            </div>
            <div className="flex items-center w-full border border-gray-300 rounded-r p-3">
              <input
                id="PATIENT"
                name="userType"
                type="radio"
                checked={!typeDoctor}
                onChange={() => setTypeDoctor(!typeDoctor)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                Patient
              </label>
            </div>
          </div>
          <div className="mt-10 w-full px-3">
            <BaseButton buttonClass="primary" text="Sign up" type="submit" />
          </div>
        </form>
        <div className="mt-10 flex flex-row items-center justify-center text-sm">
          <span className="text-gray-500 mr-1">Already have an account?</span>
          <span
            onClick={() => {
              router.push('/login')
            }}
            className="text-blue-600 hover:underline cursor-pointer">
            Log in
          </span>
        </div>
      </div>
    </div>
  )
}
