import axios from 'axios'
import { headers } from '../common'

export type NewUser = {
  name: string
  email: string
  password: string
  type: 'doctor' | 'patient'
}

export const registerUser = async (user: NewUser) => {
  const response = await axios.post('http://localhost/api/register', user, {headers})
  return response.data
}
