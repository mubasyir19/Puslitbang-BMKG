'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState('')

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }

  const changeSubMenu = (menu) => {
    if (openSubmenu === menu) {
      setOpenSubmenu('')
    } else {
      setOpenSubmenu(menu)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed w-full py-4 z-10 ${
        hasScrolled ? 'transition-all bg-black bg-opacity-70' : 'transition-all'
      }`}
    >
      <div className="flex max-w-6xl mx-auto justify-between">
        <div className="flex gap-x-4">
          <Image
            src="/images/logo-bmkg.png"
            className="w-10 h-12"
            width={60}
            height={60}
            alt="logo"
          />
          <div className="my-auto text-sm font-bold text-white">
            <p>Badan Meteorologi</p>
            <p>Klimatologi Geofisika</p>
          </div>
        </div>
        <div className="my-auto flex gap-x-12 text-base font-medium text-white">
          <Link
            href="/"
            className="p-2 hover:underline hover:underline-offset-4"
          >
            Beranda
          </Link>

          <button
            className="p-2 hover:underline hover:underline-offset-4"
            onClick={() => changeSubMenu('meteo')}
          >
            Meteorologi
          </button>

          <button
            className="p-2 hover:underline hover:underline-offset-4"
            onClick={() => changeSubMenu('klimat')}
          >
            Klimatologi
          </button>

          <button
            className="p-2 hover:underline hover:underline-offset-4"
            onClick={() => changeSubMenu('geofis')}
          >
            Geofisika
          </button>

          <Link
            href="/artikel"
            className="p-2 hover:underline hover:underline-offset-4"
          >
            Artikel
          </Link>
          <Link
            href="/profil"
            className="p-2 hover:underline hover:underline-offset-4"
          >
            Profile
          </Link>
        </div>
      </div>
      {openSubmenu == 'klimat' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Klimatologi</div>
            <div className="ml-60 py-4">
              <p>Klimatologi1</p>
              <p>Klimatologi2</p>
              <p>Klimatologi3</p>
            </div>
          </div>
        </div>
      )}
      {openSubmenu == 'meteo' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Meteorologi</div>
            <div className="ml-60 py-4">
              <p>Meteorologi1</p>
              <p>Meteorologi2</p>
              <p>Meteorologi3</p>
            </div>
          </div>
        </div>
      )}
      {openSubmenu == 'geofis' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Geofisika</div>
            <div className="ml-60 py-4">
              <p>Geofisika1</p>
              <p>Geofisika2</p>
              <p>Geofisika3</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
