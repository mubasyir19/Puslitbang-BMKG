'use client'

import { useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'

export default function DashboardLayout({ children }) {
  const { user } = useAuthContext()

  useEffect(() => {
    if (user.role !== 'superadmin') {
      location.replace('/dashboard/article')
    }
  }, [])

  return <>{children}</>
}
