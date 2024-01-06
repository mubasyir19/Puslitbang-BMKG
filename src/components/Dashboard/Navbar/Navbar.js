'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import Cookies from 'js-cookie'

export default function NavbarDashboard() {
  const { user, setIsLogin } = useAuthContext()
  const [detailMenu, setDetailMenu] = useState(false)

  const toogleDetailMenu = () => {
    setDetailMenu(!detailMenu)
  }

  const handleLogout = () => {
    Cookies.remove('token')
    setIsLogin(false)
  }

  return (
    <>
      {/* navbar */}
      <nav className="bg-blue-500 flex justify-end">
        {/* <h1 className="text-white text-2xl font-bold">Dashboard</h1> */}
        <button
          className="flex gap-x-2 p-4 text-white bg-slate-200/25 relative"
          onClick={toogleDetailMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p>{user.email}</p>
        </button>
        {/* pop up */}
        {detailMenu && (
          <div className="absolute top-14 flex text-start flex-col bg-slate-500/75 rounded-l-2xl">
            <Link
              href="/dashboard/account"
              className="text-white px-4 py-2 flex justify-start gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Detail Account
            </Link>
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 flex justify-start gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
