'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Weather() {
  const [wilayah, setWilayah] = useState([])

  useEffect(() => {
    const fetchDataBMKG = async () => {
      const response = await axios.get('/api/prakicu')
      const data = response.data
      setWilayah(data)
    }
    fetchDataBMKG()
  }, [])

  return (
    <div>
      <div className="lg:mt-[-150px]">
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
          {wilayah.map((data, index) => (
            <SwiperSlide
              key={index}
              className="card p-5 bg-black bg-opacity-40 w-[175px] h-[287px] text-white text-center rounded-3xl border-2 border-white"
            >
              <p className="font-medium text-lg">{data.kota}</p>
              <p className="font-medium text-md">{data.waktu}</p>
              <div className="flex justify-center">
                <Image src={data.icon} width={101} height={101} alt="icon" />
              </div>
              <p className="font-medium text-md">{data.cuaca}</p>
              <p className="font-medium text-lg">{data.suhu}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-4">
        <a
          href="https://bmkg.go.id/cuaca/prakiraan-cuaca.bmkg"
          target="_blank"
          className="text-blue-500"
        >
          Prakiraan Cuaca Selengkapnya
        </a>
      </div>
    </div>
  )
}
