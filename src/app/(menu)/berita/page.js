'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Berita() {
  const dataNews = [
    {
      id: 1,
      title: 'Title of News 1',
      author: 'Mahdy',
      date: '3 Juli 2023',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat.',
    },
    {
      id: 2,
      title: 'Title of News 2',
      author: 'Mahdy',
      date: '3 Juli 2023',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat.',
    },
  ]

  const limitContent = (title, limit) => {
    const words = title.split(' ')
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'
    }
    return title
  }

  return (
    <>
      <section className="lg:flex gap-2">
        <div className="lg:w-3/4 px-8">
          {dataNews.map((news) => (
            <div
              key={news.id}
              className="card-news mt-4 bg-slate-200 py-4 px-8 rounded-lg"
            >
              <h3 className="text-3xl font-bold">{news.title}</h3>
              <p className="font-semibold">
                <span>{news.author}</span> - {news.date}
              </p>
              <p className="mt-2 text-justify">
                {limitContent(news.content, 30)}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/4 mx-auto px-6 lg:px-0">
          <div className="mt-4 px-4 border-2 border-slate-300">
            <h3 className="mt-4 text-center text-xl lg:text-2xl font-bold">
              Recent Posts
            </h3>
            <div className="mb-6">
              <div className="card-news mt-6 flex md:block lg:flex gap-x-2.5">
                {/* <Image
                className="rounded-md h-20 w-20 my-auto"
                src={'/assets/images/doctor3.png'}
                width={60}
                height={60}
                // sizes=''
                alt="image-post"
              /> */}
                <div className="mt-2 lg:my-auto">
                  <p className="text-secondary text-xs md:text-sm">
                    Senin, 5 September 2023
                  </p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    This Article’s Title goes Here, but not too long.
                  </p>
                </div>
              </div>
              <div className="card-news mt-6 flex md:block lg:flex gap-x-2.5">
                {/* <Image
                className="rounded-md h-20 w-20 my-auto"
                src={'/assets/images/doctor3.png'}
                width={60}
                height={60}
                // sizes=''
                alt="image-post"
              /> */}
                <div className="mt-2 lg:my-auto">
                  <p className="text-secondary text-xs md:text-sm">
                    Senin, 5 September 2023
                  </p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    This Article’s Title goes Here, but not too long.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
