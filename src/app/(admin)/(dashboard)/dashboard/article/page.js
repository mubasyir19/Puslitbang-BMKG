'use client'

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { useMemo, useState, useEffect } from 'react'

export default function ArticlePage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const { data, isLoading, error } = useSWR(
    `/posts?page=${paginationModel.page + 1}`,
    fetcherSWR,
  )
  const [rowCountState, setRowCountState] = useState(data?.total_posts || 0)

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total_posts !== undefined ? data?.total_posts : prevRowCountState,
    )
  }, [data?.total_posts, setRowCountState])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'tags',
      headerName: 'Tags',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: () => (
        <div className="flex gap-x-2">
          <Button variant="contained" color="primary" size="small">
            Edit
          </Button>
          <Button variant="contained" color="error" size="small">
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const rows = useMemo(
    () =>
      data?.data.map((r) => ({
        id: r.id,
        title: r.title,
        author: r.author,
        tags: r.tags,
      })) || [],
    [data],
  )

  return (
    <>
      {error ? (
        'Error'
      ) : isLoading ? (
        'Loading...'
      ) : (
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
            <Box sx={{ height: '700', width: 'fit' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                rowCount={rowCountState}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
              />
            </Box>
          </div>
        </section>
      )}
    </>
  )
}
