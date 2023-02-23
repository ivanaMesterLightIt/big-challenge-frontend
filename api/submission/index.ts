import axios from 'axios'
import { baseURL, getAuthedHeaders } from '../common'

export const getMySubmissions = async () => {
  const response = await axios
    .get(`${baseURL}/my-submissions`, { headers: getAuthedHeaders() })
    .then(({ data }) => data)
  response.data?.map(submission => {
    if (submission.status === 'in_progress') {
      submission.status = 'in progress'
    }
    return submission
  })
  return response
}

export const getSubmissionById = async (submissionId: string) => {
  const response = await axios
    .get(`${baseURL}/submissions/${submissionId}`, {
      headers: getAuthedHeaders(),
    })
    .then(({ data }) => data)
  if (response.status === 'in_progress') {
    response.status = 'in progress'
  }
  return response
}

export const assignDoctorToSubmission = (submissionId: string) =>
  axios
    .post(`${baseURL}/submissions/${submissionId}/assignments`, null, {
      headers: getAuthedHeaders(),
    })
    .then(({ data }) => data)

export const finishSubmission = (submissionId: string) =>
  axios
    .post(`${baseURL}/finish/${submissionId}`, null, {
      headers: getAuthedHeaders(),
    })
    .then(({ data }) => data)

export const uploadFileToSubmission = async (data: {
  fileName: File
  id: string
}) => {
  const fileData = new FormData()
  fileData.append('uploadedFile', data.fileName)
  const response = await axios.post(`${baseURL}/upload/${data.id}`, fileData, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  })
  return response.data
}

export const downloadSubmissionFile = (submissionId: string) =>
  axios
    .get(`${baseURL}/download/${submissionId}`, { headers: getAuthedHeaders() })
    .then(({ data }) => data)
