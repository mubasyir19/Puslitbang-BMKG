import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <section
      className="h-screen w-full px-5 lg:px-28 bg-cover bg-center bg-fixed max-h-[60rem]"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/background.png')",
      }}
    >
      <div className="text-white flex flex-col justify-center items-centers max-w-6xl mx-auto h-full">
        <div className="leading-none">
          <p className="text-md md:text-lg font-bold">
            Cepat, Tepat, Akurat, Luas, dan Mudah Dipahami
          </p>
          <h1 className="text-xl lg:text-6xl font-bold w-1/2">
            Pusat Penelitian dan Pengembangan BMKG
          </h1>
        </div>
        <Link
          href="/profil"
          className="mt-12 py-4 px-8 w-fit bg-white text-black rounded"
        >
          Profil Kami
        </Link>
      </div>
    </section>
  )
}
