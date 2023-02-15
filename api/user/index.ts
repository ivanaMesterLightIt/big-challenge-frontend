import axios from 'axios'
import { headers } from '../common'

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

const baseURL = 'http://localhost/api'

export const registerUser = async (user: NewUser) => {
  const response = await axios.post(`${baseURL}/register`, user, { headers })
  return response.data
}

export const loginUser = async (user: LoginUser) => {
  const response = await axios.post(`${baseURL}/login`, user, { headers })
  return response.data
}
