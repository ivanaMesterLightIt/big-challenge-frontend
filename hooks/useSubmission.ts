import { useMutation, useQuery } from '@tanstack/react-query'
import {
  assignDoctorToSubmission,
  downloadSubmissionFile,
  finishSubmission,
  getSubmissionById,
  uploadFileToSubmission,
} from '../api/submission'
import toast from 'react-hot-toast'

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
      onError: (error: any) => {
        toast.error(error.response.data.message, {
          position: 'top-right',
        })
      },
    })
  
    const completeSubmissionMutation = useMutation({
      mutationFn: finishSubmission,
      onSuccess: () => {
        getSubmissionQuery.refetch()
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
  
    const uploadFileMutation = useMutation({
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
  
    const downloadFileMutation = useMutation({
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
  
    return {
      getSubmissionQuery,
      assignDoctorMutation,
      completeSubmissionMutation,
      uploadFileMutation,
      downloadFileMutation,
    }
  }
  