import { useMutation, useQuery } from '@tanstack/react-query'
import {
  assignDoctorToSubmission,
  downloadSubmissionFile,
  finishSubmission,
  getSubmissionById,
  uploadFileToSubmission,
} from '../api/submission'
import toast from 'react-hot-toast'
import { showError } from '../utils/showError'

export const useSubmission = (submissionId?: string) => {
  const getSubmissionQuery = useQuery(
    ['getSubmissionById', submissionId],
    () => getSubmissionById(submissionId!),
    { enabled: !!submissionId },
  )

  const assignDoctorMutation = useMutation({
    mutationFn: assignDoctorToSubmission,
    onSuccess: () => {
      getSubmissionQuery.refetch()
      toast.success('Submission successfully assigned', {
        position: 'top-right',
      })
    },
    onError: e => showError(e, 'assignDoctorToSubmission'),
  })

  const completeSubmissionMutation = useMutation({
    mutationFn: finishSubmission,
    onSuccess: () => {
      getSubmissionQuery.refetch()
      toast.success('Submission successfully finished', {
        position: 'top-right',
      })
    },
    onError: e => showError(e, 'finishSubmission'),
  })

  const uploadFileMutation = useMutation({
    mutationFn: uploadFileToSubmission,
    onError: e => showError(e, 'uploadFileToSubmission'),
  })

  const downloadFileMutation = useMutation({
    mutationFn: downloadSubmissionFile,
    onError: e => showError(e, 'downloadSubmissionFile'),
  })

  return {
    getSubmissionQuery,
    assignDoctorMutation,
    completeSubmissionMutation,
    uploadFileMutation,
    downloadFileMutation,
  }
}
