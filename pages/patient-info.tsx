import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '../components/layouts/mainLayout'
import { BackButton } from '../components/shared/BackButton'
import { getUser } from '../api/user'
import { PatienInfoForm } from '../components/patientInfo/PatientInfoForm'
import { Oval } from 'react-loader-spinner'

export default function PatientInfoPage() {
  const { data: userData, isLoading } = useQuery(['getUser'], getUser)

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
      {userData ? (
        <PatienInfoForm userData={userData} />
      ) : (
        <Oval
          height={20}
          width={20}
          color="#2563EB"
          wrapperStyle={{
            position: 'absolute',
            right: '50%',
            top: '50%',
          }}
          wrapperClass=""
          visible={isLoading}
          ariaLabel="oval-loading"
          secondaryColor="#E0F2FE"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </MainLayout>
  )
}
