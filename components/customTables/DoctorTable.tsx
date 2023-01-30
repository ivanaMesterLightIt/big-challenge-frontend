import { createColumnHelper } from '@tanstack/react-table'
import { BaseTable } from '../shared/BaseTable'
import { DoctorSubmission } from '../../types/submissions'
  
  const submissionData: DoctorSubmission[] = [
    {
      submissionTitle: 'submission 1',
      patientName: 'Patient 1',
      createdAt: '30/01/2020',
      status: 'pending',
    },
    {
      submissionTitle: 'submission 2',
      patientName: 'Patient 2',
      createdAt: '26/03/2020',
      status: 'done',
    },
    {
      submissionTitle: 'submission 3',
      patientName: 'Patient 3',
      createdAt: '26/03/2020',
      status: 'in progress',
    },
    {
      submissionTitle: 'submission 4',
      patientName: 'Patient 4',
      createdAt: '26/03/2020',
      status: 'in progress',
    },
  ]
  
  const columnHelper = createColumnHelper<DoctorSubmission>()
  
  const columns = [
    columnHelper.accessor('submissionTitle', {
      header: () => <span>SUBMISSION TITLE</span>,
      id: 'submissionTitle',
    }),
    columnHelper.accessor('patientName', {
      header: () => <span>PATIENT NAME</span>,
      id: 'patientName',
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

  export const DoctorTable = () => {
    return (
        <BaseTable<DoctorSubmission> columns={columns} tableData={submissionData} />
    );
  }