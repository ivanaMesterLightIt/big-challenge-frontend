import { z } from 'Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MainLayout } from '../components/layouts/mainLayout'
import { BackButton } from '../components/shared/BackButton'
import { BaseInput } from '../components/shared/BaseInput'
import { BaseTextArea } from '../components/shared/BaseTextArea'
import { BaseButton } from '../components/shared/BaseButton'
import { postPatientInfo } from '../api/patient'
import toast, { Toaster } from 'react-hot-toast'
import { getUser } from '../api/user'

const patientInfoSchema = z.object({
  phone: z.string().min(1, { message: 'Phone number is required' }),
  weight: z.string().min(1, { message: 'Weight is required' }),
  height: z.string().min(1, { message: 'Height is required' }),
  info: z.string(),
})

export type FormValues = z.infer<typeof patientInfoSchema>

export default function PatientInfoPage() {
  const { data: userData } = useQuery(['getUser'], getUser)

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(patientInfoSchema) })

  const getData = (data: FormValues) => {
    const newData = {
      phone: data.phone,
      weight: data.weight,
      height: data.height,
      info: data.info ? data.info : 'No comments',
    }
    return newData
  }
  const { mutate } = useMutation({
    mutationFn: postPatientInfo,
    onSuccess: () => {
      toast.success('Information successfully updated', {
        position: 'top-right',
      })
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate(getData(data))
  }
  return (
    <MainLayout userType="PATIENT">
      <div className="px-3">
        <BackButton returnTo={'/patient-home'} />
        <div className="border-b border-gray-300 pb-5">
          <h1 className="mt-2 text-xl text-gray-900">Patient information</h1>
          <h1 className="mt-1 text-sm text-gray-900">
            You need to complete your profile before adding a submission
          </h1>
        </div>
      </div>
      <form className="w-[513px] mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-row items-center justify-between">
          <BaseInput
            label="Phone number"
            type="number"
            defaultValue={userData?.info?.phone}
            error={errors.phone}
            errorMessage={errors.phone?.message}
            {...register('phone')}
          />
        </div>
        <div className="mt-1 w-full flex flex-row items-center justify-between">
          <BaseInput
            label="Weight"
            type="number"
            defaultValue={userData?.info?.weight}
            error={errors.weight}
            errorMessage={errors.weight?.message}
            {...register('weight')}
          />
          <BaseInput
            label="Height"
            type="number"
            defaultValue={userData?.info?.height}
            error={errors.height}
            errorMessage={errors.height?.message}
            {...register('height')}
          />
        </div>
        <div className="mt-1 w-full flex flex-row items-center justify-between px-3">
          <BaseTextArea
            {...register('info')}
            defaultValue={userData?.info?.info}
            label="Other info"
            rows={7}
          />
        </div>
        <div className="mt-6 w-1/3 px-3">
          <BaseButton
            buttonClass="primary"
            text="Update profile"
            type="submit"
          />
        </div>
      </form>
      <Toaster />
    </MainLayout>
  )
}
