import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'
import { getMySubmissions } from '../api/submission'
import { MainLayout } from '../components/layouts/mainLayout'
import { BaseTable } from '../components/shared/BaseTable'
import { Select } from '../components/shared/Select'
import { PatientSubmission } from '../types/submissions'

export default function PatientHomePage() {
  const [selectedStatus, setSelectedStatus] = useState('all')

  const { data: submissionsData } = useQuery(
    ['getMySubmissions'],
    async () => await getMySubmissions(),
  )

  const submissions =
    submissionsData?.map(submission => ({
      id: submission.id,
      submissionTitle: submission.title,
      doctorAssigned: submission.doctor ? submission.doctor.name : '-',
      createdAt: submission.created_at,
      status: submission.status,
    })) ?? []

  const columnHelper = createColumnHelper<PatientSubmission>()

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => 'ID',
    }),
    columnHelper.accessor('submissionTitle', {
      id: 'submissionTitle',
      header: () => 'Submission Title',
    }),
    columnHelper.accessor('doctorAssigned', {
      id: 'doctorAssigned',
      header: () => 'Doctor Assigned',
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => 'Created At',
    }),
    columnHelper.accessor('status', {
      id: 'status',
    }),
  ]

  const selectOptions = [
    { id: 'all', name: 'All submissions' },
    { id: 'pending', name: 'Pending' },
    { id: 'in progress', name: 'In Progress' },
    { id: 'done', name: 'Done' },
  ]

  return (
    <MainLayout userType="PATIENT">
      <div className='w-full pr-2 flex flex-row justify-end'>
        <div className='w-[200px]'>
        <Select
          options={selectOptions}
          onSelect={e => {
            setSelectedStatus(e.id)
          }}
        />
        </div>
      </div>
      {!!submissionsData && (
        <BaseTable
          tableData={
            selectedStatus === 'all'
              ? submissions
              : submissions.filter(
                  submission => submission.status === selectedStatus,
                )
          }
          columns={columns}
        />
      )}
    </MainLayout>
  )
}
