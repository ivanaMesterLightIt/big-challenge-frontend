import axios from 'axios'
import { headers } from './common'

export const Api = axios.create({
    baseURL: 'http://localhost:80/api',
    headers: headers,
    withCredentials: true
  });
  
export const csrf = async () => { Api.get('http://localhost:80/sanctum/csrf-cookie')}