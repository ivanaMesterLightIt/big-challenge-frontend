import { createColumnHelper } from '@tanstack/react-table'
import { BaseTable } from '../shared/BaseTable'
import { PatientSubmission } from '../../types/submissions'
  
  const submissionData: PatientSubmission[] = [
    {
      submissionTitle: 'submission 1',
      doctorAssigned: 'Doctor 1',
      createdAt: '30/01/2020',
      status: 'pending',
    },
    {
      submissionTitle: 'submission 2',
      doctorAssigned: 'Doctor 2',
      createdAt: '26/03/2020',
      status: 'done',
    },
    {
      submissionTitle: 'submission 3',
      doctorAssigned: 'Doctor 3',
      createdAt: '26/03/2020',
      status: 'in progress',
    },
    {
      submissionTitle: 'submission 4',
      doctorAssigned: 'Doctor 4',
      createdAt: '26/03/2020',
      status: 'done',
    },
  ]
  
  const columnHelper = createColumnHelper<PatientSubmission>()
  
  const columns = [
    columnHelper.accessor('submissionTitle', {
      header: () => <span>SUBMISSION TITLE</span>,
      id: 'submissionTitle',
    }),
    columnHelper.accessor('doctorAssigned', {
      header: () => <span>DOCTOR ASSIGNED</span>,
      id: 'doctorAssigned',
    }),
    columnHelper.accessor('createdAt', {
      header: () => <span>CREATED AT</span>,
      id: 'createdAt',
    }),
    columnHelper.accessor('status', {
      header: () => <span>STATUS</span>,
      id: 'status',
    }),
  ]

  export const PatientTable = () => {
    return (
        <BaseTable<PatientSubmission> columns={columns} tableData={submissionData} />
    );
  }