'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'

export default function SidebarDashboard() {
  const { user } = useAuthContext()
  const pathname = usePathname()

  const linkActive = (path) => pathname.startsWith(path)

  return (
    <>
      <aside className="bg-gray-800 text-white">
        <div className="flex gap-x-2 mb-4 p-4">
          <Image
            className="h-auto w-10"
            src="/images/logo-bmkg.png"
            height={200}
            width={200}
            alt="logo"
          />
          <h2 className="text-xs my-auto">
            Pusat Penelitian dan
            <br /> Pengembangan BMKG
          </h2>
        </div>
        <ul className="flex flex-col mt-5">
          <Link
            href="/dashboard/article"
            className={`flex gap-x-2 p-4 hover:bg-blue-500 rounded-e-full ${
              linkActive('/dashboard/article')
                ? 'bg-blue-500'
                : 'hover:bg-blue-500'
            }`}
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
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
            <span className="my-auto">Article</span>
          </Link>
          {user.role === 'superadmin' && (
            <Link
              href="/dashboard/user"
              className={`flex gap-x-2 p-4 hover:bg-blue-500 rounded-e-full ${
                linkActive('/dashboard/user')
                  ? 'bg-blue-500'
                  : 'hover:bg-blue-500'
              }`}
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <span className="my-auto">User</span>
            </Link>
          )}
        </ul>
      </aside>
    </>
  )
}
