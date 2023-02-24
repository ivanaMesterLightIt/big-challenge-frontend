import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/router';
import { useReducer, useState } from 'react'
import { tw } from '../../utils/tw'
import { Pill } from './Pill'

export interface BaseTableProps<TData extends { id: string }> {
  tableData: TData[];
  columns: ColumnDef<TData, any>[];
}

export const BaseTable = <TData extends { id: string }>({ columns, tableData }: BaseTableProps<TData>) => {
  const router = useRouter()
  const [data, setData] = useState(() => [...tableData])
  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        'id': false
      }
    },
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
                  <a onClick={() => {
                    router.push(`/submission/${row.original.id}`)
                  }}>View more</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
