'use client'

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher, fetcherSWR } from '@/helpers/fetcher'
import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useAuthContext } from '@/contexts/AuthContext'

export default function ArticlePage() {
  const router = useRouter()
  const { user } = useAuthContext()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const { data, isLoading, error, mutate } = useSWR(
    `/posts?sort=desc&page=${paginationModel.page + 1}&limit=${
      paginationModel.pageSize
    }&author=${user.role === 'superadmin' ? '' : user.email}`,
    fetcherSWR,
  )
  const [rowCountState, setRowCountState] = useState(data?.total_posts || 0)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total_posts !== undefined ? data?.total_posts : prevRowCountState,
    )
  }, [data?.total_posts, setRowCountState])

  const handleEdit = (id) => {
    router.push(`/dashboard/article/edit/${id}`)
  }

  const handleDelete = async (id) => {
    setIsButtonLoading(true)
    try {
      await fetcher.delete(`/posts/${id}`)
      notifications.show({
        title: `Success delete article: ${id}`,
      })
      mutate()
    } catch (err) {
      notifications.show({
        color: 'red',
        title: `Failed delete article: ${id}`,
      })
    } finally {
      setIsButtonLoading(false)
    }
  }

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
      renderCell: (cellValues) => (
        <div className="flex gap-x-2">
          <Button
            onClick={() => handleEdit(cellValues.row.id)}
            disabled={isButtonLoading}
            variant="contained"
            color="primary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(cellValues.row.id)}
            disabled={isButtonLoading}
            variant="contained"
            color="error"
            size="small"
          >
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
    <section className="px-5 pt-6">
      <div className="border-b mb-4">
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
          Add Article
        </Link>
      </div>
      <div className="mt-4">
        {error ? (
          'Error'
        ) : isLoading ? (
          'Loading...'
        ) : (
          <Box sx={{ height: 'fit', width: 'fit' }}>
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
        )}
      </div>
    </section>
  )
}
