'use client'

import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import Link from 'next/link'
import ArticleTextDisplay from '@/components/ArticleTextDisplay/ArticleTextDisplay'
import { formatDate } from '@/helpers/utils'
import RecentPosts from '@/components/RecentPosts/RecentPosts'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Berita() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pPage = searchParams.get('page')
  const [page, setPage] = useState(parseInt(pPage) > 0 ? parseInt(pPage) : 1)
  const { data, isLoading, error } = useSWR(`/posts?page=${page}`, fetcherSWR)

  const onNextHandler = () => {
    if (page < data.total_pages) {
      router.push(`/berita?page=${page + 1}`)
      setPage(page + 1)
    }
  }

  const onPrevHandler = () => {
    if (page > 1) {
      router.push(`/berita?page=${page - 1}`)
      setPage(page - 1)
    }
  }

  const onSkipHandler = (p) => {
    router.push(`/berita?page=${p}`)
    setPage(p)
  }

  return (
    <>
      {error ? (
        'Error'
      ) : isLoading ? (
        'Loading...'
      ) : data.data.length === 0 ? (
        'No Posts'
      ) : (
        <section className="lg:flex gap-4 mt-4">
          <div className="lg:w-3/4 flex flex-col gap-4">
            {data.data.map((d, key) => (
              <Link key={key} href={`/berita/${d.slug}`}>
                <div className="rounded-lg flex h-[240px] overflow-hidden border">
                  <div className="w-1/3 h-full">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="text-3xl font-bold line-clamp-2">
                      {d.title}
                    </h3>
                    <p className="font-semibold">
                      <span>{d.author}</span> - {formatDate(d.created_at)}
                    </p>
                    <p className="mt-2 text-justify line-clamp-4">
                      <ArticleTextDisplay content={d.text} />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="w-full flex">
              <div className="flex mx-auto gap-1">
                <button onClick={onPrevHandler} className="my-auto">
                  <FaChevronLeft />
                </button>
                {Array(data.total_pages)
                  .fill(0)
                  .map((p, key) => (
                    <button
                      key={key}
                      onClick={() => onSkipHandler(key + 1)}
                      className={`w-4 text-center border rounded ${
                        page === key + 1 && 'bg-blue-300'
                      }`}
                    >
                      {key + 1}
                    </button>
                  ))}
                <button onClick={onNextHandler} className="my-auto">
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 mx-auto px-6 lg:px-0">
            <RecentPosts />
          </div>
        </section>
      )}
    </>
  )
}
