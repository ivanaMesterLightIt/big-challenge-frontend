import axios from 'axios'
import { baseURL, getAuthedHeaders } from '../common'

interface user {
  name: string
  email: string
  id: string
  info: {
    phone: string
    weight: string
    height: string
    info: string
  }
  roles: [{ name: 'doctor' | 'patient' }]
}

interface Submission {
  id: string
  status: 'pending' | 'in progress' | 'done'
  title: string
  symptoms: string
  created_at: string
  prescription: string
  doctor?: user
  patient: user
}
type BadStatus = 'pending' | 'in progress' | 'in_progress' | 'done'
type BadSubmission = Omit<Submission, 'status'> & { status: BadStatus }
function cleanSubmission(s: BadSubmission) {
  if (s.status === 'in_progress') {
    return { ...s, status: 'in progress' }
  }
  return s
}
export const getMySubmissions = async () => {
  const response = await axios
    .get<{ data: BadSubmission[] }>(`${baseURL}/my-submissions`, {
      headers: getAuthedHeaders(),
    })
    .then(({ data }) => data.data.map(cleanSubmission))
  return response as Submission[]
}
export const getSubmissionById = async (submissionId: string) => {
  const response = await axios
    .get<BadSubmission>(`${baseURL}/submissions/${submissionId}`, {
      headers: getAuthedHeaders(),
    })
    .then(({ data }) => cleanSubmission(data))
  return response as Submission
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
export const uploadFileToSubmission = async (params: {
  fileName: File
  id: string
}) => {
  const fileData = new FormData()
  fileData.append('uploadedFile', params.fileName)
  return axios
    .post(`${baseURL}/upload/${params.id}`, fileData, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(({ data }) => data)
}
export const downloadSubmissionFile = (submissionId: string) =>
  axios
    .get(`${baseURL}/download/${submissionId}`, { headers: getAuthedHeaders() })
    .then(({ data }) => data)
