import Link from 'next/link'
import React from 'react'

export default function Scope() {
  return (
    <section className="mt-20 px-6">
      <div>
        <div className="flex gap-x-4">
          <hr className="w-8 md:w-14 lg:w-20 border-2 border-black my-auto" />
          <p className="text-lg font-bold">Ruang Lingkup</p>
        </div>
        <div className="px-4 lg:px-24">
          <h1 className="mt-4 md:mt-6 lg:mt-8 text-lg md:text-xl lg:text-3xl font-bold">
            Kami Menyajikan Informasi Terkait Meteorologi, Klimatologi, dan
            Geofisika
          </h1>
        </div>
      </div>
      <div className="mt-8 md:mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="card bg-image-meteo bg-cover w-auto h-[421px] rounded-3xl">
          <div className="content flex flex-col justify-center items-start text-white px-5 bg-black bg-opacity-50 w-full h-full rounded-3xl">
            <h3 className="text-2xl font-bold">Meteorologi</h3>
            <p className="text-base mt-5">
              Kami memberikan info secara tepat dan akurat terkait cuaca di tiap
              harinya dengan data yang akurat dan juga real time.
            </p>
            <Link
              href="#"
              className="mt-10 w-fit bg-white py-4 px-8 text-black rounded"
            >
              Selengkapnya
            </Link>
          </div>
        </div>
        <div className="card bg-image-climate bg-cover w-auto h-[421px] rounded-3xl">
          <div className="content flex flex-col justify-center items-start text-white px-5 bg-black bg-opacity-50 w-full h-full rounded-3xl">
            <h3 className="text-2xl font-bold">Klimatologi</h3>
            <p className="text-base mt-5">
              Kami memberikan info secara tepat dan akurat terkait cuaca di tiap
              harinya dengan data yang akurat dan juga real time.
            </p>
            <Link
              href="#"
              className="mt-10 w-fit bg-white py-4 px-8 text-black rounded"
            >
              Selengkapnya
            </Link>
          </div>
        </div>
        <div className="card bg-image-geo bg-cover w-auto h-[421px] rounded-3xl">
          <div className="content flex flex-col justify-center items-start text-white px-5 bg-black bg-opacity-50 w-full h-full rounded-3xl">
            <h3 className="text-2xl font-bold">Geofisika</h3>
            <p className="text-base mt-5">
              Kami memberikan info secara tepat dan akurat terkait cuaca di tiap
              harinya dengan data yang akurat dan juga real time.
            </p>
            <Link
              href="#"
              className="mt-10 w-fit bg-white py-4 px-8 text-black rounded"
            >
              Selengkapnya
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
