import { z } from 'Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { MainLayout } from '../components/layouts/mainLayout'
import { BackButton } from '../components/shared/BackButton'
import { BaseButton } from '../components/shared/BaseButton'
import { BaseInput } from '../components/shared/BaseInput'
import { BaseTextArea } from '../components/shared/BaseTextArea'
import { storeSubmission } from '../api/patient'

const submissionSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  symptoms: z.string().min(10, { message: 'Symptoms must be at least 10 characters' }),
})

export type FormValues = z.infer<typeof submissionSchema>

export default function NewSubmissionPage() {
  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(submissionSchema) })

  const { mutate } = useMutation({
    mutationFn: storeSubmission,
    onSuccess: () => {
      toast.success('Submission successfully sent', {
        position: 'top-right',
      })
      reset()
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  return (
    <MainLayout userType="PATIENT">
      <div className="px-3">
        <BackButton returnTo={'/patient-home'} />
        <div className="border-b border-gray-300 pb-5">
          <h1 className="mt-2 text-xl text-gray-900">New Submission</h1>
        </div>
      </div>
      <form className="w-[513px] mt-4" onSubmit={handleSubmit((data)=> { mutate(data) })}>
        <div className="w-full flex flex-row items-center justify-between">
          <BaseInput
            label="Title"
            type="title"
            error={errors.title}
            errorMessage={errors.title?.message}
            {...register('title')}
          />
        </div>
        <div className="mt-1 w-full flex flex-row items-center justify-between px-3">
          <BaseTextArea
            {...register('symptoms')}
            label="Symptoms"
            rows={7}
            error={errors.symptoms}
            errorMessage={errors.symptoms?.message}
          />
        </div>
        <div className="mt-6 w-1/3 px-3">
          <BaseButton
            buttonClass="primary"
            text="Send submission"
            type="submit"
          />
        </div>
      </form>
      <Toaster />
    </MainLayout>
  )
}
