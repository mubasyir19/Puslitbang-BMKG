'use client'

import Link from 'next/link'
import { formatDate } from '@/helpers/utils'

export default function RecentPosts({ posts }) {
  return (
    <div className="px-4 border rounded-lg">
      <h3 className="mt-4 text-center text-xl lg:text-2xl font-bold">
        Recent Posts
      </h3>
      <div className="mb-6">
        {posts.map((post, key) => (
          <Link key={key} href={`/berita/${post.slug}`}>
            <div className="card-news mt-6 flex md:block lg:flex gap-x-2.5">
              <div className="mt-2 lg:my-auto">
                <p className="text-secondary text-xs md:text-sm">
                  {formatDate(post.created_at)}
                </p>
                <p className="mt-1 text-sm md:text-base font-semibold">
                  {post.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
