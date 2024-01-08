'use client'

import '@mantine/core/styles.css'

import { Components } from '@/components'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (pathname !== '/dashboard') {
      setIsLoading(false)
    } else {
      location.replace('/dashboard/article')
    }
  }, [])

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex h-screen">
          <Components.SidebarDashboard />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Components.NavbarDashboard />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
              {children}
            </main>
            <Components.FooterDashboard />
          </div>
        </div>
      )}
    </>
  )
}
