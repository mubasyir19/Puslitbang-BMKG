import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="px-10 lg:px-16 pt-16 pb-4 mt-10 bg-background text-white">
      <div className="flex flex-col lg:flex-row justify-between max-w-6xl mx-auto">
        <div>
          <Image
            src="/images/logo-bmkg.png"
            width={85}
            height={85}
            className="w-auto h-20"
            alt="logo"
          />
          <div className="mt-3.5 text-sm font-bold text-white">
            <p>Badan Meteorologi</p>
            <p>Klimatologi Geofisika</p>
          </div>
        </div>
        <div className="mt-10 pe-40 lg:mt-0 flex flex-col lg:flex-row gap-y-8 gap-x-28">
          <div>
            <h3 className="text-base leading-4 font-bold">Meteorologi</h3>
            <div className="mt-8 flex flex-col gap-y-6 text-sm">
              <Link href="#" className="text-gray-500 hover:text-white">
                InaNWP
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base leading-4 font-bold">Klimatologi</h3>
          </div>
          <div>
            <h3 className="text-base leading-4 font-bold">Geofisika</h3>
            <div className="mt-8 flex flex-col gap-y-6 text-sm"></div>
          </div>
        </div>
      </div>
      <hr className="mt-20 w-full border-white" />
      <div className="mt-11 text-sm text-center">
        <p>© 2023 - Pusat Penelitian dan Pengembangan BMKG</p>
      </div>
    </footer>
  )
}
