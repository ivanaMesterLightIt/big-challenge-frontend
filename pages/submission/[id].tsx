import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import {
  assignDoctorToSubmission,
  downloadSubmissionFile,
  finishSubmission,
  getSubmissionById,
  uploadFileToSubmission,
} from '../../api/submission'
import { MainLayout } from '../../components/layouts/mainLayout'
import { BackButton } from '../../components/shared/BackButton'
import { BaseButton } from '../../components/shared/BaseButton'
import { Pill } from '../../components/shared/Pill'
import { tw } from '../../utils/tw'
import {
  InformationCircleIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import Modal from 'react-modal'

export default function SubmissionPage() {
  const [fileData, setFileData] = useState<{ id: string; fileName: File }>()
  const [modalIsOpen, setIsOpen] = useState(false)
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false)
  }

  const submissionId = router.query.id as string | undefined

  const {
    data: submissionsData,
    status,
    refetch,
  } = useQuery(
    ['getSubmissionById', submissionId],
    () => getSubmissionById(submissionId!),
    { enabled: !!submissionId },
  )

  const assignDoctor = useMutation({
    mutationFn: assignDoctorToSubmission,
    onSuccess: () => {
      refetch()
      toast.success('Submission successfully assigned', {
        position: 'top-right',
      })
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  const completeSubmission = useMutation({
    mutationFn: finishSubmission,
    onSuccess: () => {
      refetch()
      toast.success('Submission successfully finished', {
        position: 'top-right',
      })
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  const uploadFile = useMutation({
    mutationFn: uploadFileToSubmission,
    onSuccess: () => {
      toast.success('File uploaded', {
        position: 'top-right',
      })
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  const downloadFile = useMutation({
    mutationFn: downloadSubmissionFile,
    onSuccess: () => {
      toast.success('File downloaded', {
        position: 'top-right',
      })
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    },
  })

  return (
    <MainLayout userType="DOCTOR">
      {status === 'success' && submissionsData && (
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
                        assignDoctor.mutateAsync(submissionId!)
                      }}
                    />
                  </div>
                )}
                {submissionsData.status === 'in_progress' && (
                  <div className="w-[200px]">
                    <BaseButton
                      buttonClass={'primary'}
                      text={'Finish submission'}
                      onClick={() => {
                        if(fileData) {uploadFile.mutateAsync(fileData!)}
                        completeSubmission.mutateAsync(
                          submissionId!
                        )
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
                <span className="text-sm font-semibold text-gray-500">
                  Phone
                </span>
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
                      downloadFile.mutateAsync(submissionsData.id)
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
          <Toaster />
          <Modal
            style={{
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
            }}
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
                {downloadFile.data}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </MainLayout>
  )
}
