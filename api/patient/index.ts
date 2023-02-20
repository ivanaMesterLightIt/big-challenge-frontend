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
export const storePatientInfo = (patientInfo: PatientInfo) =>
  axios
    .post(`${baseURL}/info`, patientInfo, { headers: getAuthedHeaders() })
    .then(({ data }) => data)

export const storeSubmission = (submission: Submission) =>
  axios
    .post(`${baseURL}/submissions`, submission, { headers: getAuthedHeaders() })
    .then(({ data }) => data)
