'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Route } from 'next'
import { Loader2 } from 'lucide-react'

// Configure page options correctly
export const dynamic = 'force-dynamic'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get('code')
        
        if (!code) {
          throw new Error('No code provided')
        }

        await supabase.auth.exchangeCodeForSession(code)
        router.push('/dashboard' as Route)
      } catch (error) {
        console.error('Error during auth callback:', error)
        router.push('/login?error=auth_callback_failed')
      }
    }

    handleAuthCallback()
  }, [router, searchParams, supabase.auth])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <h2 className="text-lg font-semibold">Completing sign in...</h2>
        <p className="text-muted-foreground">You will be redirected automatically.</p>
      </div>
    </div>
  )
}