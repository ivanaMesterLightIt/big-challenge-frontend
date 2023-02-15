import axios from 'axios'
import { baseURL } from '../../api/common'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + window?.localStorage.getItem('token'),
}

export const logoutUser = () =>
  axios.post(`${baseURL}/logout`, null, { headers }).then(({ data }) => data)
