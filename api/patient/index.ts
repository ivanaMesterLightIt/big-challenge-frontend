import axios from 'axios'
import { baseURL, getAuthedHeaders } from '../common'


export type PatientInfo = {
    phone: string
    weight: string
    height: string
    info: string
  }
  

export const storePatientInfo = (patientInfo: PatientInfo) =>
  axios.post(`${baseURL}/info`, patientInfo, { headers: getAuthedHeaders() }).then(({ data }) => data)