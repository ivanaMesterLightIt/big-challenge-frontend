/* eslint-disable react/no-unescaped-entities */

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { BaseButton } from '../components/shared/BaseButton'
import { BaseInput } from '../components/shared/BaseInput'
import { registerUser, NewUser } from '../api/user/register'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

export interface IFormInput {
  name: string
  email: string
  password: string
  repeatPassword: string
  userType: 'PATIENT' | 'DOCTOR'
}

export default function SignUpPage() {
  const router = useRouter()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormInput>()

  const [typeDoctor, setTypeDoctor] = useState(true)

  const mailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const getRegisterData = (data: IFormInput) => {
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

  const onSubmit: SubmitHandler<IFormInput> = data => {
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
              {...register('name', {
                required: { value: true, message: 'Name is required' },
              })}
            />
            <BaseInput
              label="Email"
              error={errors.email}
              errorMessage={errors.email?.message}
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: mailPattern,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>
          <div className="w-full my-4 flex flex-row items-center justify-between">
            <BaseInput
              label="Password"
              type="password"
              error={errors.password}
              errorMessage={errors.password?.message}
              {...register('password', {
                required: { value: true, message: 'Password is required' },
                pattern: {
                  value: passwordPattern,
                  message: 'Invalid password',
                },
              })}
            />
            <BaseInput
              label="Repeat Password"
              type="password"
              error={errors.repeatPassword}
              errorMessage={errors.repeatPassword?.message}
              {...register('repeatPassword', {
                required: { value: true, message: 'Password is required' },
                pattern: {
                  value: passwordPattern,
                  message: 'Invalid password',
                },
                validate: (value, formValues) =>
                  value === formValues.password || 'Does not match password',
              })}
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
          <span className="text-blue-600 hover:underline cursor-pointer">
            Log in
          </span>
        </div>
      </div>
    </div>
  )
}
