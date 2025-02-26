import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    try {
      await supabase.auth.exchangeCodeForSession(code)
      
      // Add success parameter to the redirect URL
      return NextResponse.redirect(new URL(`${requestUrl.origin}/login?verified=true`))
    } catch (error) {
      console.error('Error verifying email:', error)
      return NextResponse.redirect(new URL(`${requestUrl.origin}/login?error=verification_failed`))
    }
  }

  // Return to login page if no code present
  return NextResponse.redirect(new URL(`${requestUrl.origin}/login`))
} 