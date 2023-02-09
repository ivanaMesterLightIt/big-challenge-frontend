import { Api, csrf } from '..'
import { headers } from '../common'
import { User } from '../models/user'

export type LoginUser = {
    email: string, 
    password: string,
}

export interface LoginUserResponse {
    status: number,
    success: boolean,
    data: User
}

export const loginUser = async (user: LoginUser) => {
    await csrf()
    return Api.post<LoginUserResponse>(
      '/login', user, { headers }
    )
  }