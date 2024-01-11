'use client'

import { Navbar } from '@/components'
import { useState } from 'react'

export default function NavbarMap({ title = '' }) {
  const [hideNav, setHideNav] = useState(true)

  return (
    <div className="absolute z-10 h-20 top-0">
      <div
        className={`absolute transition-all duration-300 ${
          hideNav && '-translate-y-20'
        }`}
      >
        <div className="w-screen h-20">
          <Navbar />
        </div>
        <h1
          className={`text-white text-center font-bold text-2xl transition-all duration-300 ${
            hideNav && 'translate-y-8'
          }`}
        >
          {title}
        </h1>
      </div>
      <div className="flex h-full">
        <button
          className="my-auto ml-4 relative z-20"
          onClick={() => setHideNav(!hideNav)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
