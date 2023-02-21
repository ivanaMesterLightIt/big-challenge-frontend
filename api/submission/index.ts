import axios from 'axios'
import { baseURL, getAuthedHeaders } from '../common'

export const getSubmissionById = (submissionId: string) =>
  axios
    .get(`${baseURL}/submissions/${submissionId}`, {
      headers: getAuthedHeaders(),
    })
    .then(({ data }) => data)

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
