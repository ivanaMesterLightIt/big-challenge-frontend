export type PatientSubmission = {
    id: string,
    submissionTitle: string,
    doctorAssigned: string,
    createdAt: string,
    status: 'pending' | 'in progress' | 'done'
}

export type DoctorSubmission = {
    id: string,
    submissionTitle: string,
    patientName: string,
    createdAt: string,
    status: 'pending' | 'in progress' | 'done'
}