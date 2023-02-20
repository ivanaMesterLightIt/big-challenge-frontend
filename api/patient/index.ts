import axios from 'axios'
import { baseURL, getAuthedHeaders } from '../common'

export type PatientInfo = {
  phone: string
  weight: string
  height: string
  info: string
}

export type Submission = {
  title: string
  symptoms: string
}
export const postPatientInfo = (patientInfo: PatientInfo) =>
  axios
    .post(`${baseURL}/info`, patientInfo, { headers: getAuthedHeaders() })
    .then(({ data }) => data)

export const postSubmission = (submission: Submission) =>
  axios
    .post(`${baseURL}/submissions`, submission, { headers: getAuthedHeaders() })
    .then(({ data }) => data)
