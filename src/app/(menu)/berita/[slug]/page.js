'use client'

import ArticleDisplay from '@/components/ArticleDisplay/ArticleDisplay'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '@/helpers/fetcher'
import { notFound } from 'next/navigation'
import { formatDate } from '@/helpers/utils'
import RecentPosts from '@/components/RecentPosts/RecentPosts'

export default function Page({ params }) {
  const { data, error } = useSWR(`/posts?slug=${params.slug}`, fetcher)
  const { data: recentPost } = useSWR(`/posts`, fetcher)

  if (error) {
    notFound()
  }

  return (
    <>
      {data && (
        <section className="lg:flex gap-4 mt-4">
          <div className="lg:w-3/4">
            <title>{data.data.title}</title>
            <h1 className="font-bold text-3xl">{data.data.title}</h1>
            <p>
              <span>{data.data.author}</span> -{' '}
              {formatDate(data.data.created_at)}
            </p>
            <div className="w-full h-[500px] mt-4">
              <img
                src={data.data.image}
                className="object-cover h-full w-full rounded"
              />
            </div>
            <ArticleDisplay content={data.data.text} />
          </div>
          <div className="w-full lg:w-1/4 mx-auto px-6 lg:px-0">
            {recentPost && <RecentPosts posts={recentPost.data} />}
          </div>
        </section>
      )}
    </>
  )
}
