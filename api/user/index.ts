import axios from 'axios'
import { baseURL, getAuthedHeaders, headers } from '../common'
import { User } from '../models/user'

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

export interface LoginResponse {
  message: string
  user: User
  token: string
}

export const registerUser = (user: NewUser) =>
  axios.post(`${baseURL}/register`, user, { headers }).then(({ data }) => data)

export const loginUser = (user: LoginUser) =>
  axios
    .post<LoginResponse>(`${baseURL}/login`, user, { headers })
    .then(({ data }) => data)

export const logoutUser = () =>
  axios
    .post(`${baseURL}/logout`, null, { headers: getAuthedHeaders() })
    .then(({ data }) => data)

export const getUser = () =>
  axios
    .get<User>(`${baseURL}/user`, { headers: getAuthedHeaders() })
    .then(({ data }) => data)
