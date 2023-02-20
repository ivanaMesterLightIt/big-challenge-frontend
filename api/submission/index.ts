import axios from 'axios'
import { baseURL, getAuthedHeaders } from '../common'

export const getMySubmissions = () =>
  axios.get(`${baseURL}/my-submissions`, { headers: getAuthedHeaders() }).then(({ data }) => data)