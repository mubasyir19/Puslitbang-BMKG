'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenuResponsive, setOpenSubmenuResponsive] = useState('')

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }

  const toogleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const changeSubMenu = (menu) => {
    if (openSubmenu === menu) {
      setOpenSubmenu('')
    } else {
      setOpenSubmenu(menu)
    }
  }
  const changeSubMenuResponsive = (menu) => {
    if (openSubmenuResponsive === menu) {
      setOpenSubmenuResponsive('')
    } else {
      setOpenSubmenuResponsive(menu)
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
      <div className="flex max-w-6xl px-4 md:px-0 mx-auto justify-between">
        <div className="flex gap-x-2 lg:gap-x-4">
          <Image
            src="/images/logo-bmkg.png"
            className="w-auto h-8 lg:h-12 my-auto"
            width={60}
            height={60}
            alt="logo"
          />
          <div className="my-auto text-xs lg:text-sm font-bold text-white">
            <p>Badan Meteorologi</p>
            <p>Klimatologi Geofisika</p>
          </div>
        </div>
        <div className="my-auto hidden md:flex gap-x-2 lg:gap-x-12 md:text-sm lg:text-base font-medium text-white">
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

          <button
            className="p-2 hover:underline hover:underline-offset-4"
            onClick={() => changeSubMenu('artikel')}
          >
            Artikel
          </button>

          <Link
            href="/profil"
            className="p-2 hover:underline hover:underline-offset-4"
          >
            Profil
          </Link>
        </div>
        <div className="md:hidden my-auto">
          <button onClick={toogleMenuOpen}>
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute text-white z-10 inset-y-0 w-full h-screen right-0 bg-black">
              <div className="text-right pt-4">
                <div className="flex justify-between md:justify-around px-6">
                  <div className="flex gap-x-4">
                    <Image
                      src="/images/logo-bmkg.png"
                      className="w-10 h-12"
                      width={60}
                      height={60}
                      alt="logo"
                    />
                    <div className="my-auto text-sm text-start font-bold text-white">
                      <p>Badan Meteorologi</p>
                      <p>Klimatologi Geofisika</p>
                    </div>
                  </div>
                  <button onClick={toogleMenuOpen}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4948 10L19.478 3.01684C19.8094 2.68601 19.9958 2.23707 19.9962 1.76879C19.9966 1.3005 19.811 0.851233 19.4802 0.519814C19.1494 0.188395 18.7004 0.00197318 18.2321 0.00155962C17.7638 0.00114607 17.3146 0.186774 16.9832 0.517609L10 7.50077L3.01684 0.517609C2.68542 0.18619 2.23592 0 1.76723 0C1.29853 0 0.849028 0.18619 0.517609 0.517609C0.18619 0.849028 0 1.29853 0 1.76723C0 2.23592 0.18619 2.68542 0.517609 3.01684L7.50077 10L0.517609 16.9832C0.18619 17.3146 0 17.7641 0 18.2328C0 18.7015 0.18619 19.151 0.517609 19.4824C0.849028 19.8138 1.29853 20 1.76723 20C2.23592 20 2.68542 19.8138 3.01684 19.4824L10 12.4992L16.9832 19.4824C17.3146 19.8138 17.7641 20 18.2328 20C18.7015 20 19.151 19.8138 19.4824 19.4824C19.8138 19.151 20 18.7015 20 18.2328C20 17.7641 19.8138 17.3146 19.4824 16.9832L12.4948 10Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-8 flex flex-col gap-y-6 text-center text-lg">
                  <Link href="/">Beranda</Link>
                  <button
                    className={`${
                      openSubmenuResponsive === 'meteo'
                        ? 'underline underline-offset-4'
                        : ''
                    }`}
                    onClick={() => changeSubMenuResponsive('meteo')}
                  >
                    Meteorologi
                  </button>
                  {openSubmenuResponsive === 'meteo' && (
                    <div className="w-full flex flex-col mx-auto py-4 px-10 gap-y-3 bg-background rounded-lg">
                      <Link href="/">InaNWP</Link>
                    </div>
                  )}
                  <button
                    className={`${
                      openSubmenuResponsive === 'klimat'
                        ? 'underline underline-offset-4'
                        : ''
                    }`}
                    onClick={() => changeSubMenuResponsive('klimat')}
                  >
                    Klimatologi
                  </button>
                  {openSubmenuResponsive === 'klimat' && (
                    <div className="w-full flex flex-col mx-auto py-4 px-10 gap-y-3 bg-background rounded-lg">
                      <Link href="/klimatologi/inarcm">InaRCM</Link>
                      <Link href="/">InaSHO</Link>
                      <Link href="/">InaAQM</Link>
                    </div>
                  )}
                  <button
                    className={`${
                      openSubmenuResponsive === 'geof'
                        ? 'underline underline-offset-4'
                        : ''
                    }`}
                    onClick={() => changeSubMenuResponsive('geof')}
                  >
                    Geofisika
                  </button>
                  {openSubmenuResponsive === 'geof' && (
                    <div className="w-full flex flex-col mx-auto py-4 px-10 gap-y-3 bg-background rounded-lg">
                      <Link href="/">Product1</Link>
                      <Link href="/">Product2</Link>
                      <Link href="/">Product3</Link>
                    </div>
                  )}
                  <button
                    className={`${
                      openSubmenuResponsive === 'artikel'
                        ? 'underline underline-offset-4'
                        : ''
                    }`}
                    onClick={() => changeSubMenuResponsive('artikel')}
                  >
                    Artikel
                  </button>
                  {openSubmenuResponsive === 'artikel' && (
                    <div className="w-full flex flex-col mx-auto py-4 px-10 gap-y-3 bg-background rounded-lg">
                      <Link href="#">Berita</Link>
                      <Link href="https://jmg.bmkg.go.id/">JMG</Link>
                    </div>
                  )}
                  <Link href="/profil">Profil</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {openSubmenu == 'klimat' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Klimatologi</div>
            <div className="flex flex-col ml-60 py-4">
              <Link
                href="/klimatologi/inarcm"
                className="hover:text-sky-400"
                target="_blank"
              >
                InaRCM
              </Link>
              <Link href="#" className="hover:text-sky-400" target="_blank">
                Hotspot Occurrence
              </Link>
              <Link href="#" className="hover:text-sky-400" target="_blank">
                InaAQM
              </Link>
            </div>
          </div>
        </div>
      )}
      {openSubmenu == 'meteo' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Meteorologi</div>
            <div className="flex flex-col ml-60 py-4">
              <Link
                href="/meteorologi/inanwp"
                className="hover:text-sky-400"
                target="_blank"
              >
                InaNWP
              </Link>
            </div>
          </div>
        </div>
      )}
      {openSubmenu == 'geofis' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Geofisika</div>
            <div className="flex flex-col ml-60 py-4">
              <Link href="#" className="hover:text-sky-400" target="_blank">
                Geofisika1
              </Link>
              <Link href="#" className="hover:text-sky-400" target="_blank">
                Geofisika2
              </Link>
              <Link href="#" className="hover:text-sky-400" target="_blank">
                Geofisika3
              </Link>
            </div>
          </div>
        </div>
      )}
      {openSubmenu == 'artikel' && (
        <div className="bg-background text-white">
          <div className="mx-auto max-w-6xl flex">
            <div className="my-auto">Artikel</div>
            <div className="flex flex-col ml-60 py-4">
              <Link href="#" className="hover:text-sky-400" target="_blank">
                Berita
              </Link>
              <Link
                href="https://jmg.bmkg.go.id/"
                className="hover:text-sky-400"
                target="_blank"
              >
                JMG (Jurnal Meteorologi dan Geofisika)
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
