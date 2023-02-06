export interface UserPersonalData {
    id: string,
    contact_phone?: string,
    weight?: string,
    height?: string,
    other_info?: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    email_verified_at: string,
    type_id: 'DOCTOR' | 'PATIENT' | 'ADMIN',
    personal_data: UserPersonalData,
    created_at: string,
    updated_at: string,
    deleted_at?: string

}