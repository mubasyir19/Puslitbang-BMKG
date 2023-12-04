'use client'

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    editable: true,
    flex: 1,
    align: 'left',
  },
  {
    field: 'author',
    headerName: 'Author',
    editable: true,
    flex: 1,
    align: 'left',
  },
  {
    field: 'tags',
    headerName: 'Tags',
    editable: true,
    flex: 1,
    align: 'left',
  },
  {
    field: 'action',
    headerName: ' ',
    flex: 1,
    align: 'left',
    renderCell: (params) => (
      <div className="flex gap-x-2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          // onClick={() => handleEdit(params.row.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          // onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export default function ArticlePage() {
  return (
    <section className="px-5 pt-6">
      <div>
        <h1 className="text-2xl font-semibold">Article</h1>
      </div>
      <div className="mt-8">
        <Link
          href="/dashboard/article/add"
          className="px-3 py-1 w-fit flex text-white bg-blue-400 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Tambah
        </Link>
      </div>
      <div className="mt-4">
        <Box sx={{ height: 400, width: 'fit' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </section>
  )
}
