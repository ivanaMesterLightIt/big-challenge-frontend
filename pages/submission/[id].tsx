import { useRouter } from 'next/router'
import {
  InformationCircleIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import Modal from 'react-modal'
import { MainLayout } from '../../components/layouts/mainLayout'
import { BackButton } from '../../components/shared/BackButton'
import { BaseButton } from '../../components/shared/BaseButton'
import { Pill } from '../../components/shared/Pill'
import { tw } from '../../utils/tw'
import { useSubmission } from '../../hooks/useSubmission'
const modalStyle: Modal.Styles = {
  content: {
    borderRadius: '10px',
    width: '500px',
    height: '350px',
    padding: '30px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
export default function SubmissionPage() {
  const [fileData, setFileData] = useState<{ id: string; fileName: File }>()
  const [modalIsOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const closeModal = () => {
    setIsOpen(false)
  }
  const submissionId = router.query.id as string | undefined
  const {
    getSubmissionQuery,
    assignDoctorMutation,
    completeSubmissionMutation,
    uploadFileMutation,
    downloadFileMutation,
  } = useSubmission(submissionId)
  if (getSubmissionQuery.error) {
    return <MainLayout userType="DOCTOR">Error!</MainLayout>
  }
  const submissionsData = getSubmissionQuery.data
  if (!submissionsData) {
    return <MainLayout userType="DOCTOR">Loading!</MainLayout>
  }
  return (
    <MainLayout userType="DOCTOR">
      <div>
        <div className="px-3">
          <BackButton returnTo={'/doctor-home'} />
          <div className="border-b border-gray-300 pb-5 mb-3">
            <div className="flex flex-row items-center justify-between">
              <div>
                <div className="mt-2 flex flex-row items-center justify-start">
                  <h1 className="mr-2 text-xl text-gray-900">
                    {submissionsData.title}
                  </h1>
                  <Pill status={submissionsData.status} />
                </div>
                <div className="mt-1 flex flex-row items-center justify-start">
                  <span className="text-xs text-gray-500">
                    {submissionsData.patient.name}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">
                    • {submissionsData.created_at}
                  </span>
                </div>
              </div>
              {submissionsData.status === 'pending' && (
                <div className="w-[200px]">
                  <BaseButton
                    buttonClass={'primary'}
                    text={'Accept submission'}
                    onClick={() => {
                      assignDoctorMutation.mutate(submissionId!)
                    }}
                  />
                </div>
              )}
              {submissionsData.status === 'in progress' && (
                <div className="w-[200px]">
                  <BaseButton
                    buttonClass={'primary'}
                    text={'Finish submission'}
                    onClick={() => {
                      if (fileData) {
                        uploadFileMutation.mutate(fileData!)
                      }
                      completeSubmissionMutation.mutate(submissionId!)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="w-1/2 flex flex-col items-start justify-center">
              <span className="text-sm font-semibold text-gray-500">
                Email address
              </span>
              <span className="mt-1 text-xs text-gray-900">
                {submissionsData.patient.email}
              </span>
            </div>
            <div className="w-1/2 flex flex-col items-start justify-center">
              <span className="text-sm font-semibold text-gray-500">Phone</span>
              <span className="mt-1 text-xs text-gray-900">
                {submissionsData.patient.info.phone}
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-start justify-center">
            <span className="text-sm font-semibold text-gray-500">
              Other info
            </span>
            <span className="mt-1 text-xs text-gray-900">
              {submissionsData.patient.info.info}
            </span>
          </div>
          <div className="mt-6 flex flex-col items-start justify-center">
            <span className="text-sm font-semibold text-gray-500">
              Symptoms
            </span>
            <span className="mt-1 text-xs text-gray-900">
              {submissionsData.symptoms}
            </span>
          </div>
          <div className="mt-6 flex flex-col items-start justify-center">
            <span className="text-sm font-semibold text-gray-500">
              Prescriptions
            </span>
            {submissionsData.status != 'done' ? (
              <div className="w-[128px] h-[46px] relative mt-2">
                <input
                  type="file"
                  id="prescriptionFile"
                  name="filename"
                  disabled={submissionsData.status === 'pending'}
                  onChange={e =>
                    setFileData({
                      id: submissionsData.id,
                      fileName: e.target.files![0],
                    })
                  }
                  className={tw(
                    submissionsData.status != 'pending'
                      ? 'text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-800'
                      : 'text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 opacity-50',
                  )}
                />
              </div>
            ) : submissionsData.prescription ? (
              <div className="mt-2 w-full flex flex-row items-center justify-between p-3 rounded border border-gray-200">
                <div className="flex flex-row items-center justify-start w-1/2">
                  <PaperClipIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-xs">prescription.txt</span>
                </div>
                <a
                  onClick={() => {
                    downloadFileMutation.mutate(submissionsData.id)
                    setIsOpen(true)
                  }}
                  className="cursor-pointer text-right text-blue-600 hover:text-blue-400 font-semibold text-xs">
                  Download
                </a>
              </div>
            ) : (
              <span className="text-gray-900 text-xs mt-1">
                No prescriptions uploaded
              </span>
            )}
            {submissionsData.status === 'pending' && (
              <div className="mt-4 w-full bg-blue-100 rounded p-3 flex flex-row items-center justify-start">
                <InformationCircleIcon className="h-5 w-5 text-blue-800" />
                <span className="text-xs font-semibold text-blue-800 ml-2">
                  Accept this submission to add a diagnosis
                </span>
              </div>
            )}
          </div>
        </div>
        <Modal
          style={modalStyle}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}>
          <div>
            <div className="absolute top-3 w-[450px] flex flex-row items-center justify-between">
              <p className="text-gray-500 font-semibold">Prescription</p>
              <a
                onClick={closeModal}
                className="text-xs text-gray-400 cursor-pointer pr-3">
                Close X
              </a>
            </div>
            <div className="absolute top-10 text-xs pr-7 py-2 text-justify">
              {downloadFileMutation.data}
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
