'use client'

import useSWR from 'swr'
import { fetcher } from '@/helpers/fetcher'
import Link from 'next/link'
import ArticleTextDisplay from '@/components/ArticleTextDisplay/ArticleTextDisplay'
import { formatDate } from '@/helpers/utils'
import RecentPosts from '@/components/RecentPosts/RecentPosts'

export default function Berita() {
  const { data } = useSWR('/posts', fetcher)

  return (
    <>
      <section className="lg:flex gap-4 mt-4">
        <div className="lg:w-3/4 flex flex-col gap-4">
          {data &&
            data.data.map((d, key) => (
              <Link key={key} href={`/berita/${d.slug}`}>
                <div className="rounded-lg flex h-[200px] overflow-hidden border">
                  <div className="w-1/3 h-full">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="text-3xl font-bold">{d.title}</h3>
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
        </div>
        <div className="w-full lg:w-1/4 mx-auto px-6 lg:px-0">
          {data && <RecentPosts posts={data.data} />}
        </div>
      </section>
    </>
  )
}
