export type PatientSubmission = {
    submissionTitle: string,
    doctorAssigned: string,
    createdAt: string,
    status: 'pending' | 'in progress' | 'done'
}

export type DoctorSubmission = {
    submissionTitle: string,
    patientName: string,
    createdAt: string,
    status: 'pending' | 'in progress' | 'done'
}