import axios from 'axios'
import { baseURL, getHeaders, headers } from '../common'

export type NewUser = {
  name: string
  email: string
  password: string
  type: 'doctor' | 'patient'
}

export type LoginUser = {
  email: string
  password: string
}

export const registerUser = (user: NewUser) =>
  axios.post(`${baseURL}/register`, user, { headers }).then(({ data }) => data)

export const loginUser = (user: LoginUser) =>
  axios.post(`${baseURL}/login`, user, { headers }).then(({ data }) => data)
  
export const logoutUser = () =>
  axios.post(`${baseURL}/logout`, null, { headers: getHeaders() }).then(({ data }) => data)
  