'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
      const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/')
        }
        setChecking(false)
      }

      checkAuth()
    }, [router])

    if (checking) {
      return null // Or a loading spinner
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    )
  }