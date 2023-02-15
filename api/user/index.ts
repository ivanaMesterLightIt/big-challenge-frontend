import axios from 'axios'
import { baseURL, headers } from '../common'

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

export const registerUser = async (user: NewUser) => {
  await axios.post(`${baseURL}/register`, user, { headers }).then(({ data }) => data)
}

export const loginUser = async (user: LoginUser) => {
  await axios.post(`${baseURL}/login`, user, { headers }).then(({ data }) => data)
}
