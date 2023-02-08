import { Api, csrf } from '..'
import { headers } from '../common'
import { User } from '../models/user'

export type NewUser = {
    name: string,
    email: string, 
    password: string,
    user_type: 'DOCTOR' | 'PATIENT'
}

export interface RegisterUserResponse {
    status: number,
    success: boolean,
    data: User
}

export const registerUser = async (user: NewUser) => {
    await csrf()
    return Api.post<RegisterUserResponse>(
      '/register', user, { headers }
    )
  }