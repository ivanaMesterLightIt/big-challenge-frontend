export const baseURL = 'http://localhost/api'

export const headers = {
  'Content-Type': 'application/json',
}

export const getHeaders = () => {
  return (
    {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  )
}