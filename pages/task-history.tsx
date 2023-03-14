import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { getMySubmissions } from '../api/submission'
import { MainLayout } from '../components/layouts/mainLayout'
import { BaseTable } from '../components/shared/BaseTable'
import { DoctorSubmission } from '../types/submissions'

const columnHelper = createColumnHelper<DoctorSubmission>()

const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: () => 'ID',
  }),
  columnHelper.accessor('submissionTitle', {
    id: 'submissionTitle',
    header: () => 'Submission Title',
  }),
  columnHelper.accessor('patientName', {
    id: 'patientName',
    header: () => 'Patient Name',
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: () => 'Created At',
  }),
  columnHelper.accessor('status', {
    id: 'status',
  }),
]

export default function TaskHistoryPage() {
  const { data: submissionsData } = useQuery(
    ['getMySubmissions'],
    getMySubmissions,
  )

  const submissions =
    submissionsData?.map(submission => ({
      id: submission.id,
      submissionTitle: submission.title,
      patientName: submission.patient ? submission.patient.name : '-',
      createdAt: submission.created_at,
      status: submission.status,
    })) ?? []

  return (
    <MainLayout userType="DOCTOR">
      {!!submissionsData && <BaseTable data={submissions} columns={columns} />}
    </MainLayout>
  )
}
