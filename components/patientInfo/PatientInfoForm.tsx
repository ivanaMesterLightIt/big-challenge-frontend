import { z } from 'Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { postPatientInfo } from '../../api/patient'
import { BaseButton } from '../shared/BaseButton'
import { BaseInput } from '../shared/BaseInput'
import { BaseTextArea } from '../shared/BaseTextArea'
import { User } from '../../api/models/user'
import { FC } from 'react'
import { showError } from '../../utils/showError'

const patientInfoSchema = z.object({
  phone: z.string().min(1, { message: 'Phone number is required' }),
  weight: z.string().min(1, { message: 'Weight is required' }),
  height: z.string().min(1, { message: 'Height is required' }),
  info: z.string().min(1, { message: 'Other info is required' }),
})

export type FormValues = z.infer<typeof patientInfoSchema>

export interface PatienInfoFormProps {
  userData: User
}

export const PatienInfoForm: FC<PatienInfoFormProps> = ({ userData }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: {
      phone: userData.info?.phone,
      weight: userData.info?.weight,
      height: userData.info?.height,
      info: userData.info?.info,
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: postPatientInfo,
    onSuccess: () => {
      toast.success('Information successfully updated', {
        position: 'top-right',
      })
    },
    onError: e => showError(e, 'postPatientInfo'),
  })

  return (
    <form className="w-[513px] mt-4" onSubmit={handleSubmit((data) => mutate(data))}>
      <div className="w-full flex flex-row items-center justify-between">
        <BaseInput
          label="Phone number"
          type="number"
          error={errors.phone}
          errorMessage={errors.phone?.message}
          {...register('phone')}
        />
      </div>
      <div className="mt-1 w-full flex flex-row items-center justify-between">
        <BaseInput
          label="Weight"
          type="number"
          error={errors.weight}
          errorMessage={errors.weight?.message}
          {...register('weight')}
        />
        <BaseInput
          label="Height"
          type="number"
          error={errors.height}
          errorMessage={errors.height?.message}
          {...register('height')}
        />
      </div>
      <div className="mt-1 w-full flex flex-row items-center justify-between px-3">
        <BaseTextArea
          placeholder="Please inform us of any allergies or chronical conditions you may suffer from"
          {...register('info')}
          label="Other info"
          rows={7}
          error={errors.info}
          errorMessage={errors.info?.message}
        />
      </div>
      <div className="mt-6 w-1/3 px-3">
        <BaseButton
          buttonClass="primary"
          text="Update profile"
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
