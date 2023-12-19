'use client'

import ArticleDisplay from '@/components/ArticleDisplay/ArticleDisplay'
import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { notFound } from 'next/navigation'
import { formatDate } from '@/helpers/utils'
import RecentPosts from '@/components/RecentPosts/RecentPosts'

export default function Page({ params }) {
  const { data, error, isLoading } = useSWR(
    `/posts?slug=${params.slug}`,
    fetcherSWR,
  )

  if (error) {
    notFound()
  }

  return (
    <>
      {error ? (
        'Error'
      ) : isLoading ? (
        'Loading...'
      ) : (
        <section className="lg:flex gap-4 mt-4">
          <div className="lg:w-3/4">
            <title>{data.title}</title>
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <p>
              <span>{data.author}</span> - {formatDate(data.created_at)}
            </p>
            <div className="w-full h-[500px] mt-4">
              <img
                src={data.image}
                className="object-cover h-full w-full rounded"
              />
            </div>
            <ArticleDisplay content={data.text} />
          </div>
          <div className="w-full lg:w-1/4 mx-auto px-6 lg:px-0">
            <RecentPosts />
          </div>
        </section>
      )}
    </>
  )
}
