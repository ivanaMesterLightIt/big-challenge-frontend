import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useReducer, useState } from 'react'
import { tw } from '../../utils/tw'
import { Pill } from './Pill'

type PatientSubmission = {
  submissionTitle: string
  doctorAssigned: string
  createdAt: string
  status: 'pending' | 'in progress' | 'done'
}

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

export const BaseTable = () => {
  const [data, setData] = useState(() => [...submissionData])
  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="rounded-lg border border-gray m-2">
      <table
        className="rounded-lg overflow-hidden"
        style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr className="bg-gray-50" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    fontWeight: 'normal',
                    color: 'gray',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                  }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
              <th
                className="text-gray-50"
                style={{ fontSize: '12px', fontWeight: 'normal' }}>
                View more
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className={tw(index % 2 !== 0 && 'bg-gray-50')}>
              {row.getVisibleCells().map(cell =>
                cell.column.id === 'status' ? (
                  <td
                    key={cell.id}
                    style={{
                      fontSize: '14px',
                      fontWeight: 'normal',
                      padding: '12px 12px',
                    }}>
                    <Pill
                      status={cell.getValue<
                        'pending' | 'in progress' | 'done'
                      >()}
                    />
                  </td>
                ) : (
                  <td
                    key={cell.id}
                    className={tw(
                      cell.column.id === 'createdAt'
                        ? 'text-gray-600'
                        : 'text-gray-900',
                    )}
                    style={{
                      fontSize: '14px',
                      fontWeight: 'normal',
                      padding: '12px 12px',
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ),
              )}
              <td
                className="text-blue-600 cursor-pointer"
                style={{
                  fontSize: '14px',
                  fontWeight: 'normal',
                  padding: '12px 12px',
                }}>
                View more
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
