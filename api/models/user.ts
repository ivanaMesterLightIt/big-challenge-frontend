export interface UserPersonalData {
  id: number
  patient_id: number
  phone?: string
  weight?: string
  height?: string
  info?: string
}

export interface User {
  id: number
  name: string
  email: string
  roles: [
    {
      name: 'doctor' | 'patient'
    }
  ]
  info: UserPersonalData
}
