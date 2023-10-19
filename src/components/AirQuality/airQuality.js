'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'

function ValidationColor(description) {
  if (description === 'Baik') {
    return 'bg-gradient-to-br from-yellow-300 to-green-600'
  } else if (description === 'Sedang') {
    return 'bg-gradient-to-br from-blue-500 to-indigo-800'
  } else if (description === 'Tidak Sehat') {
    return 'bg-gradient-to-br from-yellow-400 via-yellow-400 to-red-500'
  } else if (description === 'Sangat Tidak Sehat') {
    return 'bg-gradient-to-br from-rose-500 to-red-900'
  } else if (description === 'Bahaya') {
    return 'bg-gradient-to-br from-gray-900 to-black'
  } else {
    return 'bg-gradient-to-br from-gray-200 to-gray-400'
  }
}

export default function AirQuality() {
  const AIRQUALITY_DATA = [
    {
      place: 'Jakarta',
      quality: '31.6',
      description: 'Baik',
    },
    {
      place: 'Bandung',
      quality: '31.6',
      description: 'Sedang',
    },
    {
      place: 'Bogor',
      quality: '31.6',
      description: 'Tidak Sehat',
    },
    {
      place: 'Palembang',
      quality: '31.6',
      description: 'Sangat Tidak Sehat',
    },
    {
      place: 'Surabaya',
      quality: '31.6',
      description: 'Bahaya',
    },
    {
      place: 'Medan',
      quality: '31.6',
      description: 'Bahaya',
    },
    {
      place: 'Aceh',
      quality: '31.6',
      description: 'Sedang',
    },
    {
      place: 'Malang',
      quality: '31.6',
      description: 'Baik',
    },
    {
      place: 'Yogyakarta',
      quality: '31.6',
      description: 'Sangat Tidak Sehat',
    },
    {
      place: 'Lampung',
      quality: '31.6',
      description: 'Tidak Sehat',
    },
  ]

  const validationColor = (desc) => {
    if (desc === 'Baik') {
      return 'bg-gradient-to-br from-yellow-300 to-green-600'
    } else if (desc === 'Sedang') {
      return 'bg-gradient-to-br from-blue-500 to-indigo-800'
    } else if (desc === 'Tidak Sehat') {
      return 'bg-gradient-to-br from-yellow-400 via-yellow-400 to-red-500'
    } else if (desc === 'Sangat Tidak Sehat') {
      return 'bg-gradient-to-br from-rose-500 to-red-900'
    } else if (desc === 'Bahaya') {
      return 'bg-gradient-to-br from-gray-900 to-black'
    } else {
      return 'bg-gradient-to-br from-gray-200 to-gray-400'
    }
  }

  return (
    <section className="mt-32 ">
      <div className="px-10 flex justify-between">
        <h2 className="font-bold text-black text-4xl">Kualitas Udara</h2>
        <Link href="#" className="my-auto text-blue-400">
          Lihat Semua
        </Link>
      </div>
      <div className="list-card mt-9 flex gap-x-11 justify-center">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className=""
        >
          {AIRQUALITY_DATA.map((data, index) => (
            <SwiperSlide
              key={index}
              className={`card w-56 p-7 text-white rounded-3xl ${validationColor(
                data.description,
              )}`}
            >
              <div className="top-card">
                <p className="h-20 my-auto text-base text-center">
                  {data.description}
                </p>
                <p className="text-lg text-center">
                  PM<span className="text-xs">2.5</span>
                </p>
              </div>
              <div className=" mx-auto border-8 border-white rounded-full w-32 h-32 flex justify-center items-center">
                <p className="text-4xl">{data.quality}</p>
              </div>
              <div className="mt-6 flex gap-x-2 justify-center">
                <div className="flex">
                  <svg
                    width="24"
                    height="28"
                    viewBox="0 0 24 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9403 6.94985e-05L12.2975 0.00663609C18.7038 0.218008 23.8217 5.50476 23.7999 11.9738L23.7997 12.117C23.7268 15.9758 21.796 19.7754 18.5927 23.1663C17.0124 24.8124 15.2477 26.2696 13.3337 27.5091L13.3476 27.4988L13.2801 27.556C12.515 28.1057 11.5011 28.145 10.7004 27.6738L10.5197 27.556L10.4352 27.4897L9.85638 27.1C7.45236 25.4427 5.31132 23.432 3.50969 21.1412L3.0664 20.5627C1.1789 18.089 0.107252 15.0866 0 11.9368L0.00647895 11.538C0.217135 5.11196 5.48768 -0.021782 11.9403 6.94985e-05ZM11.9331 2.12452L11.5968 2.12907C6.34945 2.28904 2.13582 6.59717 2.11786 11.8999L2.14458 12.3997C2.32646 14.8924 3.23005 17.2819 4.75491 19.2805C6.648 21.8163 8.97116 23.9983 11.6181 25.7265L11.7332 25.8133C11.8289 25.8964 11.9709 25.8964 12.0666 25.8133L12.185 25.7243C13.9618 24.5737 15.6001 23.2208 17.0613 21.6989C19.9268 18.6655 21.6207 15.3321 21.682 12.0969L21.6775 11.6328C21.518 6.36925 17.2231 2.14261 11.9331 2.12452ZM11.8999 7.56181C14.4036 7.56181 16.4333 9.59776 16.4333 12.1092C16.4333 14.6207 14.4036 16.6567 11.8999 16.6567C9.39615 16.6567 7.36646 14.6207 7.36646 12.1092C7.36646 9.59776 9.39615 7.56181 11.8999 7.56181ZM11.8999 9.6862C10.5658 9.6862 9.48431 10.771 9.48431 12.1092C9.48431 13.4474 10.5658 14.5323 11.8999 14.5323C13.234 14.5323 14.3155 13.4474 14.3155 12.1092C14.3155 10.771 13.234 9.6862 11.8999 9.6862Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-2xl text-white">{data.place}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
