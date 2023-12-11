'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useCallback, useEffect, useState } from 'react'
// import { useCallback } from 'react'
import { getDataWeather } from '@/services/weather'
// import { data } from 'autoprefixer'

export default function Weather() {
  const [wilayah, setWilayah] = useState([])
  const [weather, setWeather] = useState([])
  const [temperature, setTemperature] = useState([])

  useEffect(() => {
    const fetchDataWeather = async () => {
      const responseData = await getDataWeather()

      const filteredParamData = responseData.map((d) => {
        const filterWeather = d.Parameter.filter(
          (param) => param.Id === 'weather',
        )

        const filterTemperature = d.Parameter.filter(
          (param) => param.Id === 't',
        )

        return {
          ID: d.ID,
          Kota: d.Kota,
          Provinsi: d.Provinsi,
          Latitude: d.Latitude,
          Longtitude: d.Longitude,
          Coordinate: d.Coordinate,
          Weather: filterWeather,
          Temperature: filterTemperature,
        }
      })

      setWilayah(filteredParamData)
    }

    fetchDataWeather()
  }, [])

  const WEATHER_DATA = [
    {
      place: 'Jakarta',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Bandung',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Bogor',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Palembang',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Medan',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Aceh',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Surabaya',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Malang',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
    {
      place: 'Yogyakarta',
      time: '19.00',
      img: '/images/cerah-berawan.png',
      weather: 'Cerah Berawan',
      temp: '24°C',
    },
  ]

  return (
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
            <p className="font-medium text-lg">{data.Kota}</p>
            <p className="font-medium text-md">{data.time}</p>
            {/* {data.Weather[0].Elements.map((hour, i) => {
              return (
                <p key={i} className="font-medium text-md">
                  {hour.h} == {hour.elements[0].value}
                </p>
              )
            })} */}
            <div className="flex justify-center">
              {data.Weather[0].Elements[0].elements[0].value === '0' ? (
                <Image
                  src="/images/cerah.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '1' ? (
                <Image
                  src="/images/cerah-berawan.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '3' ? (
                <Image
                  src="/images/berawan.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '4' ? (
                <Image
                  src="/images/berawan-tebal.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '5' ? (
                <Image
                  src="/images/berawan-tebal.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '10' ? (
                <Image
                  src="/images/asap.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '45' ? (
                <Image
                  src="/images/kabut.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '60' ? (
                <Image
                  src="/images/hujan-ringan.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '61' ? (
                <Image
                  src="/images/hujan-ringan.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '63' ? (
                <Image
                  src="/images/hujan-lebat.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '80' ? (
                <Image
                  src="/images/hujan-lebat.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '95' ? (
                <Image
                  src="/images/hujan-petir.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : data.Weather[0].Elements[0].elements[0].value === '97' ? (
                <Image
                  src="/images/hujan-petir.png"
                  width={101}
                  height={101}
                  alt="icon"
                />
              ) : (
                <p>icon</p>
              )}
            </div>
            <p className="font-medium text-md">{data.weather}</p>
            <p className="font-medium text-lg">
              {data.Temperature[0].Elements[0].elements[0].value}°C
            </p>
            <Link
              href="#"
              className="flex justify-center gap-x-2 font-medium text-sm"
            >
              <span>Selengkapnya</span>
              <svg
                className="my-auto"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1621 7.36312H0.834673C0.598183 7.36312 0.39981 7.28082 0.239553 7.11621C0.0792967 6.95161 -0.000553558 6.74814 2.88813e-06 6.5058C2.88813e-06 6.2629 0.0801313 6.05914 0.240388 5.89453C0.400645 5.72993 0.598739 5.64791 0.834673 5.64848H10.1621L6.07223 1.44762C5.90529 1.27615 5.82516 1.07611 5.83184 0.847493C5.83852 0.618875 5.9256 0.418833 6.09309 0.247369C6.26003 0.0901939 6.45478 0.00789153 6.67736 0.000461425C6.89994 -0.00696868 7.0947 0.0753337 7.26163 0.247369L12.7705 5.90568C12.8539 5.99141 12.9132 6.08429 12.9482 6.18431C12.9833 6.28433 13.0005 6.39149 13 6.5058C13 6.62011 12.9825 6.72728 12.9474 6.8273C12.9123 6.92732 12.8534 7.02019 12.7705 7.10593L7.26163 12.7642C7.10861 12.9214 6.91747 13 6.68821 13C6.45896 13 6.26058 12.9214 6.09309 12.7642C5.92616 12.5928 5.84269 12.389 5.84269 12.153C5.84269 11.9169 5.92616 11.7134 6.09309 11.5426L10.1621 7.36312Z"
                  fill="white"
                />
              </svg>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
