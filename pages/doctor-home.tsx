import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'
import { getSubmissions } from '../api/submission'
import { MainLayout } from '../components/layouts/mainLayout'
import { BaseTable } from '../components/shared/BaseTable'
import { Select } from '../components/shared/Select'
import { DoctorSubmission } from '../types/submissions'

export default function DoctorHomePage() {
  const [selectedStatus, setSelectedStatus] = useState('all')

  const { data: submissionsData, status } = useQuery(
    ['getSubmissions'],
    async () => await getSubmissions(),
  )

  const submissions =
    submissionsData?.map(submission => ({
      id: submission.id,
      submissionTitle: submission.title,
      patientName: submission.patient ? submission.patient.name : '-',
      createdAt: submission.created_at,
      status: submission.status,
    })) ?? []

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

  const selectOptions = [
    { id: 'all', name: 'All submissions' },
    { id: 'pending', name: 'Pending' },
    { id: 'in progress', name: 'In Progress' },
    { id: 'done', name: 'Done' },
  ]

  return (
    <MainLayout userType="DOCTOR">
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
      {status === 'success' && selectedStatus === 'all' && (
        <BaseTable tableData={submissions} columns={columns} />
      )}
      {status === 'success' && selectedStatus === 'pending' && (
        <BaseTable
          tableData={submissions.filter(
            submission => submission.status === 'pending',
          )}
          columns={columns}
        />
      )}
      {status === 'success' && selectedStatus === 'in progress' && (
        <BaseTable
          tableData={submissions.filter(
            submission => submission.status === 'in progress',
          )}
          columns={columns}
        />
      )}
      {status === 'success' && selectedStatus === 'done' && (
        <BaseTable
          tableData={submissions.filter(
            submission => submission.status === 'done',
          )}
          columns={columns}
        />
      )}
    </MainLayout>
  )
}
